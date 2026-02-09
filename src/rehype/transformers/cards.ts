/**
 * Cards transformer
 *
 * Transforms <table data-view="cards"> into GitBookCards component
 */

import type { Element, Text, ElementContent } from 'hast';
import { registerRehypeTransformer, type RehypeTransformer } from './index.js';

/**
 * Check if element is a cards table
 */
function isCardsTable(element: Element): boolean {
  if (element.tagName !== 'table') return false;
  return element.properties?.dataView === 'cards';
}

/**
 * Extract text content from element
 */
function getTextContent(node: ElementContent): string {
  if (node.type === 'text') {
    return (node as Text).value;
  }
  if (node.type === 'element' && 'children' in node) {
    return (node as Element).children.map(getTextContent).join('');
  }
  return '';
}

/**
 * Find element by tag name
 */
function findElement(element: Element, tagName: string): Element | null {
  if (element.tagName === tagName) return element;

  for (const child of element.children) {
    if (child.type === 'element') {
      const found = findElement(child as Element, tagName);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Find all elements by tag name
 */
function findAllElements(element: Element, tagName: string): Element[] {
  const results: Element[] = [];

  if (element.tagName === tagName) {
    results.push(element);
  }

  for (const child of element.children) {
    if (child.type === 'element') {
      results.push(...findAllElements(child as Element, tagName));
    }
  }

  return results;
}

interface CardData {
  title: string;
  href: string;
}

/**
 * Extract card data from table rows
 */
function extractCards(table: Element): CardData[] {
  const cards: CardData[] = [];
  const tbody = findElement(table, 'tbody');

  if (!tbody) return cards;

  const rows = findAllElements(tbody, 'tr');

  for (const row of rows) {
    const cells = findAllElements(row, 'td');
    if (cells.length >= 2) {
      const titleCell = cells[0];
      const linkCell = cells[1];

      const title = getTextContent(titleCell);
      const link = findElement(linkCell, 'a');
      const href = link?.properties?.href ? String(link.properties.href) : '';

      if (title && href) {
        cards.push({ title, href });
      }
    }
  }

  return cards;
}

/**
 * Transform cards table to GitBookCards
 */
const cardsTransformer: RehypeTransformer = (element: Element): Element | null => {
  const cards = extractCards(element);

  if (cards.length === 0) {
    return null;
  }

  // Create card elements
  const cardElements: Element[] = cards.map((card) => ({
    type: 'element',
    tagName: 'GitBookCard',
    properties: {
      title: card.title,
      href: card.href,
    },
    children: [],
  }));

  // Create MDX JSX element
  const mdxElement: Element = {
    type: 'element',
    tagName: 'GitBookCards',
    properties: {},
    children: cardElements,
  };

  return mdxElement;
};

// Register transformer
registerRehypeTransformer(isCardsTable, cardsTransformer);

export { cardsTransformer, isCardsTable };
