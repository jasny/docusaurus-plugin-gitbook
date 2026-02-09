/**
 * OpenAPI block transformer
 *
 * Transforms {% openapi src="..." path="..." method="..." %}...{% endopenapi %}
 * into GitBookOpenAPI component
 *
 * Note: This is a simplified implementation that displays API endpoint info.
 * For full OpenAPI documentation, consider using dedicated plugins like
 * docusaurus-openapi-docs.
 */

import type { Content } from 'mdast';
import type { GitBookBlock } from '../../parser/index.js';
import { createMdxJsxElement } from '../utils.js';
import { registerTransformer, type BlockTransformer } from './index.js';

/**
 * Transform an openapi block into MDX JSX element
 */
const openapiTransformer: BlockTransformer = (
  block: GitBookBlock,
  _transformContent: (content: string) => Content[]
): Content[] | null => {
  const src = block.attributes.src || '';
  const path = block.attributes.path || '';
  const method = block.attributes.method || 'get';

  if (!src || !path) {
    console.warn('OpenAPI block missing src or path attribute');
    return null;
  }

  const element = createMdxJsxElement(
    'GitBookOpenAPI',
    { src, path, method: method.toUpperCase() },
    []
  );

  return [element];
};

// Register transformer
registerTransformer('openapi', openapiTransformer);

export { openapiTransformer };
