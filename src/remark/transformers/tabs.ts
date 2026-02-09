/**
 * Tabs block transformer
 *
 * Transforms {% tabs %}{% tab title="X" %}content{% endtab %}{% endtabs %}
 * into GitBookTabs/GitBookTab components
 */

import type { Content } from 'mdast';
import type { GitBookBlock } from '../../parser/index.js';
import { createMdxJsxElement } from '../utils.js';
import { registerTransformer, type BlockTransformer } from './index.js';

/**
 * Transform a tabs block into MDX JSX elements
 */
const tabsTransformer: BlockTransformer = (
  block: GitBookBlock,
  transformContent: (content: string) => Content[]
): Content[] | null => {
  // Process child tab blocks
  const tabElements: Content[] = [];

  for (const child of block.children) {
    if (child.name === 'tab') {
      const title = child.attributes.title || 'Tab';
      const tabContent = transformContent(child.content);

      const tabElement = createMdxJsxElement(
        'GitBookTab',
        { title },
        tabContent
      );
      tabElements.push(tabElement);
    }
  }

  if (tabElements.length === 0) {
    return null;
  }

  // Create the tabs container
  const element = createMdxJsxElement('GitBookTabs', {}, tabElements);

  return [element];
};

/**
 * Tab blocks are handled as children of tabs, not standalone
 * This transformer is here in case a tab is found outside of tabs
 */
const tabTransformer: BlockTransformer = (
  block: GitBookBlock,
  transformContent: (content: string) => Content[]
): Content[] | null => {
  // Standalone tab - just render as a div with title
  const title = block.attributes.title || 'Tab';
  const children = transformContent(block.content);

  const element = createMdxJsxElement('GitBookTab', { title }, children);

  return [element];
};

// Register transformers
registerTransformer('tabs', tabsTransformer);
registerTransformer('tab', tabTransformer);

export { tabsTransformer, tabTransformer };
