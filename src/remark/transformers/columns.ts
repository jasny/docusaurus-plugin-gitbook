/**
 * Columns block transformer
 *
 * Transforms {% columns %}{% column %}content{% endcolumn %}{% endcolumns %}
 * into GitBookColumns/GitBookColumn components
 */

import type { Content } from 'mdast';
import type { GitBookBlock } from '../../parser/index.js';
import { createMdxJsxElement } from '../utils.js';
import { registerTransformer, type BlockTransformer } from './index.js';

/**
 * Transform a columns block into MDX JSX elements
 */
const columnsTransformer: BlockTransformer = (
  block: GitBookBlock,
  transformContent: (content: string) => Content[]
): Content[] | null => {
  // Process child column blocks
  const columnElements: Content[] = [];

  for (const child of block.children) {
    if (child.name === 'column') {
      const columnContent = transformContent(child.content);

      const columnElement = createMdxJsxElement(
        'GitBookColumn',
        {},
        columnContent
      );
      columnElements.push(columnElement);
    }
  }

  if (columnElements.length === 0) {
    return null;
  }

  // Create the columns container
  const element = createMdxJsxElement('GitBookColumns', {}, columnElements);

  return [element];
};

/**
 * Column blocks are handled as children of columns
 */
const columnTransformer: BlockTransformer = (
  block: GitBookBlock,
  transformContent: (content: string) => Content[]
): Content[] | null => {
  const children = transformContent(block.content);
  const element = createMdxJsxElement('GitBookColumn', {}, children);

  return [element];
};

// Register transformers
registerTransformer('columns', columnsTransformer);
registerTransformer('column', columnTransformer);

export { columnsTransformer, columnTransformer };
