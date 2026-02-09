/**
 * Icon transformer
 *
 * Transforms <i class="fa-xxx"> into FAIcon component
 * which renders Font Awesome icons via CSS classes.
 */

import type { Element } from 'hast';
import { registerRehypeTransformer, type RehypeTransformer } from './index.js';

/**
 * Check if element is a font awesome icon
 */
function isIconElement(element: Element): boolean {
  if (element.tagName !== 'i') return false;

  const className = element.properties?.className;
  if (!className) return false;

  const classes = Array.isArray(className) ? className : [className];
  return classes.some((c) => String(c).startsWith('fa-') || String(c) === 'fa');
}

/**
 * Extract icon classes
 */
function extractIconClasses(classes: string[]): string {
  const iconClasses = classes.filter((c) => c.startsWith('fa-') || c === 'fa');
  return iconClasses.join(' ') || 'fa-circle';
}

/**
 * Transform icon element to FAIcon
 */
const iconTransformer: RehypeTransformer = (element: Element): Element | null => {
  const className = element.properties?.className;
  const classes = Array.isArray(className) ? className.map(String) : [String(className)];

  const icon = extractIconClasses(classes);

  // Create MDX JSX element
  const mdxElement: Element = {
    type: 'element',
    tagName: 'FAIcon',
    properties: {
      icon,
    },
    children: [],
  };

  return mdxElement;
};

// Register transformer
registerRehypeTransformer(isIconElement, iconTransformer);

export { iconTransformer, isIconElement };
