/**
 * Rehype plugin exports
 */

export { default as rehypeGitBook } from './plugin.js';
export type { RehypeGitBookOptions } from './plugin.js';
export {
  registerRehypeTransformer,
  getTransformerForElement,
  hasTransformerForElement,
  type RehypeTransformer,
  type ElementMatcher,
} from './transformers/index.js';
