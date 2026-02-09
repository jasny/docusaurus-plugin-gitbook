/**
 * Hint block transformer
 *
 * Transforms {% hint style="info" %}content{% endhint %}
 * into Docusaurus Admonition component (@theme/Admonition)
 *
 * GitBook hint styles map to Docusaurus admonition types:
 *   info    → info
 *   warning → warning
 *   danger  → danger
 *   success → tip
 */

import type { Content } from 'mdast';
import type { GitBookBlock } from '../../parser/index.js';
import { createMdxJsxElement } from '../utils.js';
import { registerTransformer, type BlockTransformer } from './index.js';

// Map GitBook hint styles to Docusaurus admonition types
const STYLE_TO_ADMONITION: Record<string, string> = {
  info: 'info',
  warning: 'warning',
  danger: 'danger',
  success: 'tip',
};

/**
 * Transform a hint block into a Docusaurus Admonition
 */
const hintTransformer: BlockTransformer = (
  block: GitBookBlock,
  transformContent: (content: string) => Content[]
): Content[] | null => {
  const style = block.attributes.style || 'info';
  const admonitionType = STYLE_TO_ADMONITION[style] || 'info';

  // Transform the content inside the hint
  const children = transformContent(block.content);

  // Use Docusaurus's built-in Admonition component
  const element = createMdxJsxElement('Admonition', { type: admonitionType }, children);

  return [element];
};

// Register the transformer
registerTransformer('hint', hintTransformer);

export { hintTransformer };
