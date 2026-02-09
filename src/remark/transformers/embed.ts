/**
 * Embed block transformer
 *
 * Transforms {% embed url="..." %} into GitBookEmbed component
 */

import type { Content } from 'mdast';
import type { GitBookBlock } from '../../parser/index.js';
import { createMdxJsxElement } from '../utils.js';
import { registerTransformer, type BlockTransformer } from './index.js';

/**
 * Transform an embed block into MDX JSX element
 */
const embedTransformer: BlockTransformer = (
  block: GitBookBlock,
  _transformContent: (content: string) => Content[]
): Content[] | null => {
  const url = block.attributes.url || '';

  if (!url) {
    console.warn('Embed block missing url attribute');
    return null;
  }

  const element = createMdxJsxElement('GitBookEmbed', { url }, []);

  return [element];
};

// Register transformer
registerTransformer('embed', embedTransformer);

export { embedTransformer };
