import type { LoadContext, Plugin } from '@docusaurus/types';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Re-export remark plugin
export { remarkGitBook } from './remark/index.js';
export type { RemarkGitBookOptions } from './remark/index.js';

// Re-export rehype plugin
export { rehypeGitBook } from './rehype/index.js';
export type { RehypeGitBookOptions } from './rehype/index.js';

// Re-export parser utilities
export * from './parser/index.js';

// Re-export theme types
export * from './theme-types.js';

/**
 * Plugin options
 */
export interface PluginOptions {
  /**
   * Plugin instance ID
   */
  id?: string;

  /**
   * Enable/disable specific blocks
   */
  blocks?: {
    hint?: boolean;
    tabs?: boolean;
    stepper?: boolean;
    columns?: boolean;
    updates?: boolean;
    code?: boolean;
    embed?: boolean;
    file?: boolean;
    include?: boolean;
    openapi?: boolean;
    cards?: boolean;
    button?: boolean;
    icon?: boolean;
    expression?: boolean;
  };

  /**
   * Custom class name prefix for CSS
   */
  classNamePrefix?: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Docusaurus plugin for GitBook syntax support
 */
export default function pluginGitbook(
  _context: LoadContext,
  options: PluginOptions = {}
): Plugin {
  const { blocks: _blocks, classNamePrefix: _classNamePrefix } = options;

  return {
    name: 'docusaurus-plugin-gitbook',

    getThemePath() {
      return path.resolve(__dirname, './theme');
    },

    getTypeScriptThemePath() {
      return path.resolve(__dirname, '../src/theme');
    },

    getClientModules() {
      return [path.resolve(__dirname, './theme/gitbook.css')];
    },
  };
}

/**
 * Validate plugin options
 */
export function validateOptions({
  options,
  validate: _validate,
}: {
  options: PluginOptions;
  validate: <T>(schema: unknown, options: T) => T;
}): PluginOptions {
  // For now, just return options as-is
  // In the future, we could add Joi schema validation
  return options;
}
