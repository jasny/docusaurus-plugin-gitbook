import { describe, it, expect } from 'vitest';
import { remarkParsed, astToString } from './helpers.js';

describe('gitbook asset path rewrite', () => {
  it('rewrites markdown URLs from .gitbook/assets to /assets', () => {
    const tree = remarkParsed(`![Banner](.gitbook/assets/banner.png)
[Manual](/.gitbook/assets/manual.pdf)
[Ref][banner]

[banner]: .gitbook/assets/banner.svg`);
    const str = astToString(tree);

    expect(str).toContain('/assets/banner.png');
    expect(str).toContain('/assets/manual.pdf');
    expect(str).toContain('/assets/banner.svg');
    expect(str).not.toContain('.gitbook/assets/');
  });

  it('rewrites asset URLs in transformed JSX attributes', () => {
    const tree = remarkParsed(`{% file src=".gitbook/assets/archive.zip" %}
Download archive.
{% endfile %}`);
    const str = astToString(tree);

    expect(str).toContain('GitBookFile');
    expect(str).toContain('/assets/archive.zip');
    expect(str).not.toContain('.gitbook/assets/archive.zip');
  });

  it('rewrites cover frontmatter URLs', () => {
    const tree = remarkParsed(
      '# Page',
      {},
      {
        frontMatter: {
          cover: {
            dark: '.gitbook/assets/banner-dark.png',
            light: '.gitbook/assets/banner-light.png',
          },
        },
      }
    );
    const str = astToString(tree);

    expect(str).toContain('GitBookCover');
    expect(str).toContain('/assets/banner-dark.png');
    expect(str).toContain('/assets/banner-light.png');
    expect(str).not.toContain('.gitbook/assets/banner-dark.png');
    expect(str).not.toContain('.gitbook/assets/banner-light.png');
  });

  it('keeps non-asset .gitbook references untouched', () => {
    const tree = remarkParsed(`{% include ".gitbook/includes/disclaimer.md" %}`);
    const str = astToString(tree);

    expect(str).toContain('.gitbook/includes/disclaimer.md');
  });
});
