/**
 * Include block transformer
 *
 * Transforms {% include "path/to/file.md" %} into GitBookInclude component
 *
 * Note: Full file inclusion at build time requires Docusaurus integration.
 * This transformer renders a component that displays the include reference.
 * For actual file inclusion, consider using Docusaurus's native MDX imports.
 */

import type { Content } from 'mdast';
import type { GitBookBlock } from '../../parser/index.js';
import { createMdxJsxElement } from '../utils.js';
import { registerTransformer, type BlockTransformer } from './index.js';

/**
 * Transform an include block into MDX JSX element
 */
const includeTransformer: BlockTransformer = (
  block: GitBookBlock,
  _transformContent: (content: string) => Content[]
): Content[] | null => {
  // Get path from positional argument or src attribute
  const path = block.attributes._positional || block.attributes.src || '';

  if (!path) {
    console.warn('Include block missing path');
    return null;
  }

  const element = createMdxJsxElement('GitBookInclude', { src: path }, []);

  return [element];
};

// Register transformer
registerTransformer('include', includeTransformer);

export { includeTransformer };
