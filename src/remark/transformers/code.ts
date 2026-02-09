/**
 * Code block transformer
 *
 * Transforms {% code title="filename.js" %}```js...```{% endcode %}
 * into GitBookCodeBlock component
 */

import type { Content } from 'mdast';
import type { GitBookBlock } from '../../parser/index.js';
import { createMdxJsxElement } from '../utils.js';
import { registerTransformer, type BlockTransformer } from './index.js';

/**
 * Transform a code block into MDX JSX element
 */
const codeTransformer: BlockTransformer = (
  block: GitBookBlock,
  transformContent: (content: string) => Content[]
): Content[] | null => {
  const title = block.attributes.title || '';
  const lineNumbers = block.attributes.lineNumbers === 'true';
  const overflow = block.attributes.overflow || 'scroll';

  // The content should contain a code fence
  // We pass it through as children
  const children = transformContent(block.content);

  const attributes: Record<string, string> = { title };

  if (lineNumbers) {
    attributes.lineNumbers = 'true';
  }
  if (overflow !== 'scroll') {
    attributes.overflow = overflow;
  }

  const element = createMdxJsxElement('GitBookCodeBlock', attributes, children);

  return [element];
};

// Register transformer
registerTransformer('code', codeTransformer);

export { codeTransformer };
