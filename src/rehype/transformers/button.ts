/**
 * Button transformer
 *
 * Transforms <a class="button primary/secondary"> into GitBookButton component
 */

import type { Element } from 'hast';
import { registerRehypeTransformer, type RehypeTransformer } from './index.js';

/**
 * Check if element is a button link
 */
function isButtonLink(element: Element): boolean {
  if (element.tagName !== 'a') return false;

  const className = element.properties?.className;
  if (!className) return false;

  const classes = Array.isArray(className) ? className : [className];
  return classes.some((c) => String(c).includes('button'));
}

/**
 * Transform button link to GitBookButton
 */
const buttonTransformer: RehypeTransformer = (element: Element): Element | null => {
  const className = element.properties?.className;
  const classes = Array.isArray(className) ? className.map(String) : [String(className)];

  const isPrimary = classes.some((c) => c.includes('primary'));
  const isSecondary = classes.some((c) => c.includes('secondary'));
  const variant = isPrimary ? 'primary' : isSecondary ? 'secondary' : 'primary';

  const href = String(element.properties?.href || '');
  const icon = element.properties?.dataIcon ? String(element.properties.dataIcon) : undefined;

  // Create MDX JSX element
  const mdxElement: Element = {
    type: 'element',
    tagName: 'GitBookButton',
    properties: {
      href,
      variant,
      ...(icon && { icon }),
    },
    children: element.children,
  };

  return mdxElement;
};

// Register transformer
registerRehypeTransformer(isButtonLink, buttonTransformer);

export { buttonTransformer, isButtonLink };
