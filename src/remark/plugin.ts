/**
 * Remark plugin for GitBook syntax
 */

import type { Root, Content } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { parse, type GitBookBlock } from '../parser/index.js';
import { getTransformer, hasTransformer } from './transformers/index.js';
import { containsGitBookSyntax, getTextContent } from './utils.js';

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
 * Process content string into MDAST nodes
 * This is a simplified version - in practice, we'd use a proper markdown parser
 */
function parseMarkdownContent(content: string): Content[] {
  // For now, return as a simple text paragraph
  // This will be enhanced to properly parse nested markdown
  if (!content.trim()) {
    return [];
  }

  // Check if content has GitBook blocks
  if (containsGitBookSyntax(content)) {
    const result = parse(content);
    const nodes: Content[] = [];

    // TODO: Properly interleave text and blocks
    // For now, just process blocks
    for (const block of result.blocks) {
      const processed = processBlock(block, parseMarkdownContent);
      if (processed) {
        nodes.push(...processed);
      }
    }

    if (nodes.length > 0) {
      return nodes;
    }
  }

  // Return as text paragraph
  return [
    {
      type: 'paragraph',
      children: [{ type: 'text', value: content }],
    },
  ];
}

/**
 * Collect consecutive nodes that form a GitBook block
 */
function collectBlockNodes(
  parent: { children: Content[] },
  startIndex: number
): { text: string; endIndex: number } | null {
  const children = parent.children;
  let text = '';
  let endIndex = startIndex;
  let depth = 0;
  let foundStart = false;

  for (let i = startIndex; i < children.length; i++) {
    const node = children[i];
    const nodeText = getTextContent(node);
    text += nodeText + '\n';

    // Count open/close tags
    const opens = (nodeText.match(/\{%\s*(?!end)\w+/g) || []).length;
    const closes = (nodeText.match(/\{%\s*end\w+/g) || []).length;

    if (opens > 0) {
      foundStart = true;
      depth += opens;
    }
    depth -= closes;

    endIndex = i;

    if (foundStart && depth <= 0) {
      break;
    }
  }

  if (!foundStart) {
    return null;
  }

  return { text: text.trim(), endIndex };
}

/**
 * The remark plugin
 */
const remarkGitBook: Plugin<[RemarkGitBookOptions?], Root> = (
  options = {}
) => {
  const { blocks: enabledBlocks } = options;

  return (tree: Root) => {
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

    // Second pass: transform collected nodes (in reverse order to preserve indices)
    for (let i = nodesToProcess.length - 1; i >= 0; i--) {
      const { parent, startIndex, endIndex, text } = nodesToProcess[i];

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

    // Add imports for all GitBook components at the beginning of the document
    // This ensures components from both remark and rehype transformations are available
    // Tree-shaking will remove unused imports in production
    const importNode = createImportNode(ALL_GITBOOK_COMPONENTS);
    tree.children.unshift(importNode);
  };
};

export default remarkGitBook;
