/**
 * MDAST manipulation utilities
 */

import type { Content, Paragraph, Text } from 'mdast';
import type { MdxJsxFlowElement, MdxJsxAttribute } from 'mdast-util-mdx-jsx';

/**
 * Create an MDX JSX element node
 */
export function createMdxJsxElement(
  name: string,
  attributes: Record<string, string>,
  children: Content[] = []
): MdxJsxFlowElement {
  const mdxAttributes: MdxJsxAttribute[] = Object.entries(attributes).map(
    ([key, value]) => ({
      type: 'mdxJsxAttribute',
      name: key,
      value,
    })
  );

  return {
    type: 'mdxJsxFlowElement',
    name,
    attributes: mdxAttributes,
    children: children as MdxJsxFlowElement['children'],
  };
}

/**
 * Create a text node
 */
export function createTextNode(value: string): Text {
  return {
    type: 'text',
    value,
  };
}

/**
 * Create a paragraph node
 */
export function createParagraph(children: Content[]): Paragraph {
  return {
    type: 'paragraph',
    children: children as Paragraph['children'],
  };
}

/**
 * Check if a node is a paragraph with text content
 */
export function isParagraphWithText(
  node: Content
): node is Paragraph & { children: [Text] } {
  return (
    node.type === 'paragraph' &&
    node.children.length === 1 &&
    node.children[0].type === 'text'
  );
}

/**
 * Get text content from a node
 */
export function getTextContent(node: Content): string {
  if (node.type === 'text') {
    return node.value;
  }
  if ('children' in node && Array.isArray(node.children)) {
    return node.children.map((child) => getTextContent(child as Content)).join('');
  }
  return '';
}

/**
 * Check if text contains GitBook syntax
 */
export function containsGitBookSyntax(text: string): boolean {
  return /\{%\s*\w+/.test(text);
}
