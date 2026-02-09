/**
 * Rehype plugin for GitBook HTML-based syntax
 */

import type { Root, ElementContent } from 'hast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import {
  getTransformerForElement,
  hasTransformerForElement,
} from './transformers/index.js';

// Import all transformers to register them
import './transformers/all.js';

export interface RehypeGitBookOptions {
  /**
   * Enable/disable specific transformations
   */
  transforms?: Record<string, boolean>;
}

/**
 * The rehype plugin
 */
const rehypeGitBook: Plugin<[RehypeGitBookOptions?], Root> = (
  _options = {}
) => {
  return (tree: Root) => {
    visit(tree, 'element', (node, index, parent) => {
      if (index === undefined || !parent) return;

      // Check if we have a transformer for this element
      if (!hasTransformerForElement(node)) return;

      const transformer = getTransformerForElement(node);
      if (!transformer) return;

      const transformed = transformer(node);
      if (transformed) {
        // Replace the node
        (parent.children as ElementContent[])[index] = transformed;
      }
    });
  };
};

export default rehypeGitBook;
