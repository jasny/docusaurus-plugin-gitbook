import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import type { LoadContext } from '@docusaurus/types';
import pluginGitbook from '../src/index.js';

describe('gitbook asset copy conflicts', () => {
  it('fails when a GitBook asset would overwrite /assets content', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'gitbook-assets-'));

    try {
      const siteDir = path.join(tempRoot, 'site');
      const gitbookAssetsDir = path.join(tempRoot, '.gitbook', 'assets');
      const staticAssetsDir = path.join(siteDir, 'static', 'assets');

      fs.mkdirSync(gitbookAssetsDir, { recursive: true });
      fs.mkdirSync(staticAssetsDir, { recursive: true });

      fs.writeFileSync(path.join(gitbookAssetsDir, 'banner.png'), 'gitbook');
      fs.writeFileSync(path.join(staticAssetsDir, 'banner.png'), 'site');

      const plugin = pluginGitbook(
        {
          siteDir,
          siteConfig: {
            staticDirectories: ['static'],
          },
        } as LoadContext,
        {}
      );

      expect(() => plugin.configureWebpack?.({}, false)).toThrow(
        /GitBook asset conflict detected/
      );
    } finally {
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  });
});
