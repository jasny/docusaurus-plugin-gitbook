/**
 * MDAST manipulation utilities
 */

import type { Content, Paragraph, Text } from 'mdast';
import type { MdxJsxFlowElement, MdxJsxAttribute } from 'mdast-util-mdx-jsx';
import { trackComponent } from './plugin.js';

/**
 * Create an MDX JSX element node
 */
export function createMdxJsxElement(
  name: string,
  attributes: Record<string, string>,
  children: Content[] = []
): MdxJsxFlowElement {
  // Track this component for import generation
  trackComponent(name);

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
 * Get plain text content from a node (inline elements only).
 * Used for checking whether a paragraph contains GitBook syntax.
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
 * Serialize an MDAST node back to markdown text.
 * Preserves code fences, heading markers, list markers, inline code, etc.
 * so that re-parsing with remark-parse reproduces the proper AST structure.
 */
export function nodeToMarkdown(node: Content): string {
  switch (node.type) {
    case 'text':
      return node.value;
    case 'inlineCode':
      return `\`${node.value}\``;
    case 'code': {
      const n = node as Content & { lang?: string; meta?: string; value: string };
      const lang = n.lang || '';
      const meta = n.meta ? ` ${n.meta}` : '';
      return `\`\`\`${lang}${meta}\n${n.value}\n\`\`\``;
    }
    case 'heading': {
      const h = node as Content & { depth: number; children: Content[] };
      const prefix = '#'.repeat(h.depth);
      const text = h.children.map((c) => nodeToMarkdown(c as Content)).join('');
      return `${prefix} ${text}`;
    }
    case 'paragraph':
      return (node as Content & { children: Content[] }).children
        .map((c) => nodeToMarkdown(c as Content))
        .join('');
    case 'list': {
      const list = node as Content & { ordered?: boolean; children: Content[] };
      return list.children
        .map((item, i) => {
          const prefix = list.ordered ? `${i + 1}. ` : '- ';
          const content = (item as Content & { children: Content[] }).children
            .map((c) => nodeToMarkdown(c as Content))
            .join('\n');
          return `${prefix}${content}`;
        })
        .join('\n');
    }
    case 'emphasis':
      return `*${(node as Content & { children: Content[] }).children.map((c) => nodeToMarkdown(c as Content)).join('')}*`;
    case 'strong':
      return `**${(node as Content & { children: Content[] }).children.map((c) => nodeToMarkdown(c as Content)).join('')}**`;
    case 'link': {
      const link = node as Content & { url: string; children: Content[] };
      const text = link.children.map((c) => nodeToMarkdown(c as Content)).join('');
      return `[${text}](${link.url})`;
    }
    case 'blockquote':
      return (node as Content & { children: Content[] }).children
        .map((c) => `> ${nodeToMarkdown(c as Content)}`)
        .join('\n');
    case 'thematicBreak':
      return '---';
    default:
      if ('children' in node && Array.isArray(node.children)) {
        return (node.children as Content[])
          .map((c) => nodeToMarkdown(c))
          .join('');
      }
      if ('value' in node) {
        return (node as Content & { value: string }).value;
      }
      return '';
  }
}

/**
 * Check if text contains GitBook syntax
 */
export function containsGitBookSyntax(text: string): boolean {
  return /\{%\s*\w+/.test(text);
}
