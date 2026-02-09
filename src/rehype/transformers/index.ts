/**
 * Rehype transformer registry
 */

import type { Element } from 'hast';

/**
 * Transformer function type for rehype
 * Takes an HAST element and returns a transformed element or null
 */
export type RehypeTransformer = (element: Element) => Element | null;

/**
 * Matcher function to determine if an element should be transformed
 */
export type ElementMatcher = (element: Element) => boolean;

interface TransformerEntry {
  match: ElementMatcher;
  transform: RehypeTransformer;
}

/**
 * Registry of rehype transformers
 */
const transformers: TransformerEntry[] = [];

/**
 * Register a transformer for matching elements
 */
export function registerRehypeTransformer(
  match: ElementMatcher,
  transform: RehypeTransformer
): void {
  transformers.push({ match, transform });
}

/**
 * Get transformer for an element
 */
export function getTransformerForElement(
  element: Element
): RehypeTransformer | undefined {
  for (const entry of transformers) {
    if (entry.match(element)) {
      return entry.transform;
    }
  }
  return undefined;
}

/**
 * Check if any transformer matches an element
 */
export function hasTransformerForElement(element: Element): boolean {
  return transformers.some((entry) => entry.match(element));
}
