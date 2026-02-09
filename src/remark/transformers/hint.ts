/**
 * Hint block transformer
 *
 * Transforms {% hint style="info" %}content{% endhint %} into GitBookHint component
 */

import type { Content } from 'mdast';
import type { GitBookBlock } from '../../parser/index.js';
import { createMdxJsxElement } from '../utils.js';
import { registerTransformer, type BlockTransformer } from './index.js';

const VALID_STYLES = ['info', 'warning', 'danger', 'success'] as const;
type HintStyle = (typeof VALID_STYLES)[number];

function isValidStyle(style: string): style is HintStyle {
  return VALID_STYLES.includes(style as HintStyle);
}

/**
 * Transform a hint block into MDX JSX element
 */
const hintTransformer: BlockTransformer = (
  block: GitBookBlock,
  transformContent: (content: string) => Content[]
): Content[] | null => {
  const style = block.attributes.style || 'info';

  if (!isValidStyle(style)) {
    console.warn(`Invalid hint style: ${style}, defaulting to 'info'`);
  }

  const validStyle = isValidStyle(style) ? style : 'info';

  // Transform the content inside the hint
  const children = transformContent(block.content);

  // Create the MDX JSX element
  const element = createMdxJsxElement('GitBookHint', { style: validStyle }, children);

  return [element];
};

// Register the transformer
registerTransformer('hint', hintTransformer);

export { hintTransformer };
