import type { LoadContext, Plugin } from '@docusaurus/types';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const _require = createRequire(import.meta.url);

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
const GITBOOK_ASSETS_OUTPUT_DIR = 'assets';

function listFilesRecursive(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFilesRecursive(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function assertNoAssetConflicts(
  context: LoadContext,
  gitbookAssetsDir: string
): void {
  const siteConfig = context.siteConfig as
    | { staticDirectories?: string[] }
    | undefined;
  const staticDirectories = siteConfig?.staticDirectories?.length
    ? siteConfig.staticDirectories
    : ['static'];

  const sourceFiles = listFilesRecursive(gitbookAssetsDir);
  if (sourceFiles.length === 0) return;

  const conflictingPaths: string[] = [];
  for (const sourceFile of sourceFiles) {
    const relativeFromAssets = path.relative(gitbookAssetsDir, sourceFile);
    const relativeDestination = path.join(
      GITBOOK_ASSETS_OUTPUT_DIR,
      relativeFromAssets
    );

    for (const staticDirectory of staticDirectories) {
      const absoluteStaticDirectory = path.resolve(context.siteDir, staticDirectory);
      const existingTarget = path.join(absoluteStaticDirectory, relativeDestination);

      if (fs.existsSync(existingTarget)) {
        conflictingPaths.push(relativeDestination);
        break;
      }
    }
  }

  if (conflictingPaths.length === 0) return;

  const uniqConflicts = [...new Set(conflictingPaths)].sort();
  const preview = uniqConflicts
    .slice(0, 10)
    .map((p) => `- ${p}`)
    .join('\n');

  throw new Error(
    `GitBook asset conflict detected. The plugin copies .gitbook/assets to /${GITBOOK_ASSETS_OUTPUT_DIR}, but these files already exist in static directories:\n${preview}\n` +
      `${uniqConflicts.length > 10 ? `...and ${uniqConflicts.length - 10} more.` : ''}`
  );
}

/**
 * Docusaurus plugin for GitBook syntax support
 */
export default function pluginGitbook(
  context: LoadContext,
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

    configureWebpack(_config, isServer) {
      if (isServer) return {};

      // Look for .gitbook/assets in common locations relative to siteDir
      const candidates = [
        path.resolve(context.siteDir, '../.gitbook/assets'),
        path.resolve(context.siteDir, '../docs/.gitbook/assets'),
        path.resolve(context.siteDir, '.gitbook/assets'),
        path.resolve(context.siteDir, 'docs/.gitbook/assets'),
      ];

      const gitbookAssetsDir = candidates.find((d) => fs.existsSync(d));
      if (!gitbookAssetsDir) return {};
      assertNoAssetConflicts(context, gitbookAssetsDir);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const CopyPlugin = _require('copy-webpack-plugin') as any;

      return {
        plugins: [
          new CopyPlugin({
            patterns: [
              {
                from: gitbookAssetsDir,
                to: GITBOOK_ASSETS_OUTPUT_DIR,
              },
            ],
          }),
        ],
      };
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
