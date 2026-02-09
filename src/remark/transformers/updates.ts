/**
 * Updates block transformer
 *
 * Transforms {% updates %}{% update date="..." %}content{% endupdate %}{% endupdates %}
 * into GitBookUpdates/GitBookUpdate components
 */

import type { Content } from 'mdast';
import type { GitBookBlock } from '../../parser/index.js';
import { createMdxJsxElement } from '../utils.js';
import { registerTransformer, type BlockTransformer } from './index.js';

/**
 * Transform an updates block into MDX JSX elements
 */
const updatesTransformer: BlockTransformer = (
  block: GitBookBlock,
  transformContent: (content: string) => Content[]
): Content[] | null => {
  const format = block.attributes.format || 'full';

  // Process child update blocks
  const updateElements: Content[] = [];

  for (const child of block.children) {
    if (child.name === 'update') {
      const date = child.attributes.date || '';
      const updateContent = transformContent(child.content);

      const updateElement = createMdxJsxElement(
        'GitBookUpdate',
        { date },
        updateContent
      );
      updateElements.push(updateElement);
    }
  }

  if (updateElements.length === 0) {
    return null;
  }

  // Create the updates container
  const element = createMdxJsxElement('GitBookUpdates', { format }, updateElements);

  return [element];
};

/**
 * Update blocks are handled as children of updates
 */
const updateTransformer: BlockTransformer = (
  block: GitBookBlock,
  transformContent: (content: string) => Content[]
): Content[] | null => {
  const date = block.attributes.date || '';
  const children = transformContent(block.content);
  const element = createMdxJsxElement('GitBookUpdate', { date }, children);

  return [element];
};

// Register transformers
registerTransformer('updates', updatesTransformer);
registerTransformer('update', updateTransformer);

export { updatesTransformer, updateTransformer };
