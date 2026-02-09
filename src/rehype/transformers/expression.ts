/**
 * Expression transformer
 *
 * Transforms <code class="expression"> into GitBookExpression component
 */

import type { Element, Text } from 'hast';
import { registerRehypeTransformer, type RehypeTransformer } from './index.js';

/**
 * Check if element is an expression code element
 */
function isExpressionElement(element: Element): boolean {
  if (element.tagName !== 'code') return false;

  const className = element.properties?.className;
  if (!className) return false;

  const classes = Array.isArray(className) ? className : [className];
  return classes.some((c) => String(c) === 'expression');
}

/**
 * Get text content from element
 */
function getTextContent(element: Element): string {
  let text = '';
  for (const child of element.children) {
    if (child.type === 'text') {
      text += (child as Text).value;
    }
  }
  return text;
}

/**
 * Transform expression element to GitBookExpression
 */
const expressionTransformer: RehypeTransformer = (element: Element): Element | null => {
  const expression = getTextContent(element);

  // Create MDX JSX element
  const mdxElement: Element = {
    type: 'element',
    tagName: 'GitBookExpression',
    properties: {
      expression,
    },
    children: [],
  };

  return mdxElement;
};

// Register transformer
registerRehypeTransformer(isExpressionElement, expressionTransformer);

export { expressionTransformer, isExpressionElement };
