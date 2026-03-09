/**
 * Remark plugin for GitBook syntax
 */

import type { Root, Content } from 'mdast';
import type { Plugin } from 'unified';
import type { VFile } from 'vfile';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import { parse, type GitBookBlock } from '../parser/index.js';
import { tokenize, isTextSegment } from '../parser/tokenizer.js';
import { getTransformer, hasTransformer } from './transformers/index.js';
import { containsGitBookSyntax, createMdxJsxElement, getTextContent, nodeToMarkdown } from './utils.js';

// Import all transformers to register them
import './transformers/all.js';

export interface RemarkGitBookOptions {
  /**
   * Enable/disable specific blocks
   */
  blocks?: Record<string, boolean>;
}

// All components that might be used (GitBook custom + Docusaurus built-ins)
const ALL_GITBOOK_COMPONENTS = [
  'GitBookCover',
  'Admonition',
  'GitBookTabs',
  'GitBookTab',
  'GitBookStepper',
  'GitBookStep',
  'GitBookColumns',
  'GitBookColumn',
  'GitBookCodeBlock',
  'GitBookUpdates',
  'GitBookUpdate',
  'GitBookEmbed',
  'GitBookFile',
  'GitBookInclude',
  'GitBookOpenAPI',
  'GitBookButton',
  'FAIcon',
  'GitBookCards',
  'GitBookCard',
  'GitBookExpression',
];

// Set to track which components are used in the current document
let usedComponents: Set<string>;

/**
 * Create an mdxjsEsm node for imports
 */
function createImportNode(componentNames: string[]): Content {
  const imports = componentNames
    .map((name) => `import ${name} from '@theme/${name}';`)
    .join('\n');

  return {
    type: 'mdxjsEsm',
    value: imports,
    data: {
      estree: {
        type: 'Program',
        body: componentNames.map((name) => ({
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportDefaultSpecifier',
              local: { type: 'Identifier', name },
            },
          ],
          source: { type: 'Literal', value: `@theme/${name}` },
        })),
        sourceType: 'module',
      },
    },
  } as Content;
}

/**
 * Track component usage
 */
export function trackComponent(name: string): void {
  if (usedComponents) {
    usedComponents.add(name);
  }
}

/**
 * Process a GitBook block into MDAST nodes
 */
function processBlock(
  block: GitBookBlock,
  processContent: (content: string) => Content[]
): Content[] | null {
  const transformer = getTransformer(block.name);

  if (!transformer) {
    // No transformer for this block type - return as-is (raw text)
    console.warn(`No transformer for GitBook block: ${block.name}`);
    return null;
  }

  return transformer(block, processContent);
}

/**
 * Process content string into MDAST nodes by parsing it as real markdown.
 * Any nested GitBook blocks within the parsed content are recursively
 * transformed.
 */
function parseMarkdownContent(content: string): Content[] {
  if (!content.trim()) {
    return [];
  }

  // Parse the content as proper markdown to produce real MDAST nodes
  // (headings, code blocks, lists, inline code, etc.)
  const tree = unified().use(remarkParse).parse(content);
  const children = tree.children as Content[];

  // Walk the parsed nodes and transform any that contain GitBook syntax
  const result: Content[] = [];
  let i = 0;

  while (i < children.length) {
    const node = children[i];
    const nodeText = getTextContent(node);

    if (containsGitBookSyntax(nodeText)) {
      // Collect consecutive nodes forming the GitBook block
      const collected = collectBlockNodes({ children }, i);
      if (collected) {
        const parseResult = parse(collected.text);
        for (const block of parseResult.blocks) {
          const processed = processBlock(block, parseMarkdownContent);
          if (processed) {
            result.push(...processed);
          }
        }
        i = collected.endIndex + 1;
        continue;
      }
    }

    // Not GitBook syntax — keep the node as-is
    result.push(node);
    i++;
  }

  return result;
}

/**
 * Collect consecutive nodes that form a GitBook block.
 *
 * Uses the actual tokenizer to track depth so that self-closing tags
 * (e.g. {% embed %}, {% include %}) are handled correctly — they don't
 * increment depth and the function stops after consuming just that node.
 */
function collectBlockNodes(
  parent: { children: Content[] },
  startIndex: number
): { text: string; endIndex: number } | null {
  const children = parent.children;
  let text = '';
  let endIndex = startIndex;

  for (let i = startIndex; i < children.length; i++) {
    const node = children[i];
    const nodeText = nodeToMarkdown(node);
    text += (i > startIndex ? '\n' : '') + nodeText;
    endIndex = i;

    // Use the tokenizer to properly track depth —
    // self-closing tokens don't affect depth.
    const segments = tokenize(text);
    let depth = 0;
    let hasTag = false;

    for (const segment of segments) {
      if (!isTextSegment(segment)) {
        hasTag = true;
        if (segment.type === 'open') depth++;
        else if (segment.type === 'close') depth--;
        // self-closing doesn't change depth
      }
    }

    if (hasTag && depth <= 0) {
      break;
    }
  }

  // Verify we actually collected GitBook syntax
  const segments = tokenize(text.trim());
  const hasTag = segments.some((s) => !isTextSegment(s));
  if (!hasTag) return null;

  return { text: text.trim(), endIndex };
}

/**
 * The remark plugin
 */
const remarkGitBook: Plugin<[RemarkGitBookOptions?], Root> = (
  options = {}
) => {
  const { blocks: enabledBlocks } = options;

  return (tree: Root, vfile: VFile) => {
    // Initialize component tracking for this document
    usedComponents = new Set<string>();

    // First pass: find and mark nodes containing GitBook syntax
    const nodesToProcess: Array<{
      parent: Root | Content;
      startIndex: number;
      endIndex: number;
      text: string;
    }> = [];

    visit(tree, 'paragraph', (node, index, parent) => {
      if (index === undefined || !parent) return;

      const text = getTextContent(node);

      if (containsGitBookSyntax(text)) {
        // Collect all consecutive nodes that might be part of this block
        const collected = collectBlockNodes(
          parent as { children: Content[] },
          index
        );

        if (collected) {
          nodesToProcess.push({
            parent: parent as Root | Content,
            startIndex: index,
            endIndex: collected.endIndex,
            text: collected.text,
          });
        }
      }
    });

    // Filter out entries whose startIndex falls inside another entry's range.
    // This prevents overlapping splices when GitBook tags inside a block
    // (e.g. {% tab %} nodes inside {% tabs %}) are also picked up by visit.
    const topLevelNodes = nodesToProcess.filter((entry) =>
      !nodesToProcess.some(
        (other) =>
          other !== entry &&
          other.parent === entry.parent &&
          entry.startIndex > other.startIndex &&
          entry.startIndex <= other.endIndex
      )
    );

    // Second pass: transform collected nodes (in reverse order to preserve indices)
    for (let i = topLevelNodes.length - 1; i >= 0; i--) {
      const { parent, startIndex, endIndex, text } = topLevelNodes[i];

      if (!('children' in parent)) continue;

      const parseResult = parse(text);

      if (parseResult.blocks.length === 0) continue;

      const newNodes: Content[] = [];

      for (const block of parseResult.blocks) {
        // Check if block is enabled
        if (enabledBlocks && enabledBlocks[block.name] === false) {
          continue;
        }

        // Check if we have a transformer
        if (!hasTransformer(block.name)) {
          continue;
        }

        const processed = processBlock(block, parseMarkdownContent);
        if (processed) {
          newNodes.push(...processed);
        }
      }

      if (newNodes.length > 0) {
        // Replace nodes
        const deleteCount = endIndex - startIndex + 1;
        (parent.children as Content[]).splice(
          startIndex,
          deleteCount,
          ...newNodes
        );
      }
    }

    // Inject cover image if specified in frontmatter
    const frontmatter = (vfile.data as Record<string, unknown>).frontMatter as
      | Record<string, unknown>
      | undefined;
    if (frontmatter?.cover) {
      const cover = frontmatter.cover;
      const attrs: Record<string, string> = {};
      if (typeof cover === 'string') {
        attrs.dark = cover;
        attrs.light = cover;
      } else if (typeof cover === 'object' && cover !== null) {
        const c = cover as Record<string, string>;
        if (c.dark) attrs.dark = c.dark;
        if (c.light) attrs.light = c.light;
      }
      if (Object.keys(attrs).length > 0) {
        const coverNode = createMdxJsxElement('GitBookCover', attrs);
        tree.children.unshift(coverNode as Content);
      }
    }

    // Add imports for all GitBook components at the beginning of the document
    // This ensures components from both remark and rehype transformations are available
    // Tree-shaking will remove unused imports in production
    const importNode = createImportNode(ALL_GITBOOK_COMPONENTS);
    tree.children.unshift(importNode);
  };
};

export default remarkGitBook;
