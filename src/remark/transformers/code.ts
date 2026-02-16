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

  // Modify content to add showLineNumbers to code fence if needed
  let content = block.content;
  if (lineNumbers) {
    // Add showLineNumbers to the code fence language identifier
    // Match ```language or ```language some-meta
    content = content.replace(/^```(\w+)(\s|$)/m, '```$1 showLineNumbers$2');
  }

  // Transform the content
  const children = transformContent(content);

  const attributes: Record<string, string> = { title };

  if (overflow !== 'scroll') {
    attributes.overflow = overflow;
  }

  const element = createMdxJsxElement('GitBookCodeBlock', attributes, children);

  return [element];
};

// Register transformer
registerTransformer('code', codeTransformer);

export { codeTransformer };
