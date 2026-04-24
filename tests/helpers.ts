/**
 * Shared test helpers
 */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import rehypeParse from 'rehype-parse';
import type { Root as MdastRoot } from 'mdast';
import type { Root as HastRoot } from 'hast';
import remarkGitBook, {
  type RemarkGitBookOptions,
} from '../src/remark/plugin.js';
import rehypeGitBook from '../src/rehype/plugin.js';

/**
 * Parse markdown through the remark plugin and return the AST
 */
export function remarkParsed(
  markdown: string,
  options?: RemarkGitBookOptions,
  fileData?: Record<string, unknown>
): MdastRoot {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGitBook, options ?? {});
  const tree = processor.parse(markdown);
  processor.runSync(tree, {
    data: fileData ?? {},
  });
  return tree as MdastRoot;
}

/**
 * Parse HTML through the rehype plugin and return the AST
 */
export function rehypeParsed(html: string): HastRoot {
  const processor = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeGitBook);
  const tree = processor.parse(html);
  processor.runSync(tree);
  return tree as HastRoot;
}

/**
 * Stringify a tree to JSON for simple containment checks
 */
export function astToString(tree: MdastRoot | HastRoot): string {
  return JSON.stringify(tree);
}
