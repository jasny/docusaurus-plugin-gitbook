/**
 * File block transformer
 *
 * Transforms {% file src="..." %}description{% endfile %}
 * into GitBookFile component
 */

import type { Content } from 'mdast';
import type { GitBookBlock } from '../../parser/index.js';
import { createMdxJsxElement } from '../utils.js';
import { registerTransformer, type BlockTransformer } from './index.js';

/**
 * Transform a file block into MDX JSX element
 */
const fileTransformer: BlockTransformer = (
  block: GitBookBlock,
  transformContent: (content: string) => Content[]
): Content[] | null => {
  const src = block.attributes.src || '';

  if (!src) {
    console.warn('File block missing src attribute');
    return null;
  }

  // Transform description content
  const children = block.content ? transformContent(block.content) : [];

  const element = createMdxJsxElement('GitBookFile', { src }, children);

  return [element];
};

// Register transformer
registerTransformer('file', fileTransformer);

export { fileTransformer };
