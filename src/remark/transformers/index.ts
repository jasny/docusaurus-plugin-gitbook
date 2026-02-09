/**
 * Block transformer registry
 */

import type { Content } from 'mdast';
import type { GitBookBlock } from '../../parser/index.js';

/**
 * Transformer function type
 * Takes a GitBook block and returns MDAST nodes
 */
export type BlockTransformer = (
  block: GitBookBlock,
  transformContent: (content: string) => Content[]
) => Content[] | null;

/**
 * Registry of block transformers
 */
const transformers: Map<string, BlockTransformer> = new Map();

/**
 * Register a transformer for a block type
 */
export function registerTransformer(
  blockName: string,
  transformer: BlockTransformer
): void {
  transformers.set(blockName, transformer);
}

/**
 * Get a transformer for a block type
 */
export function getTransformer(blockName: string): BlockTransformer | undefined {
  return transformers.get(blockName);
}

/**
 * Check if a transformer exists for a block type
 */
export function hasTransformer(blockName: string): boolean {
  return transformers.has(blockName);
}

/**
 * Get all registered block names
 */
export function getRegisteredBlocks(): string[] {
  return Array.from(transformers.keys());
}
