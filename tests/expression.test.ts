import { describe, it, expect } from 'vitest';
import { rehypeParsed, astToString } from './helpers.js';

describe('expression block (rehype)', () => {
  it('transforms code with class="expression"', () => {
    const tree = rehypeParsed(
      `<code class="expression">product.name</code>`
    );
    const str = astToString(tree);

    expect(str).toContain('GitBookExpression');
    expect(str).toContain('product.name');
  });

  it('does not transform regular code elements', () => {
    const tree = rehypeParsed(`<code>console.log('hello')</code>`);
    const str = astToString(tree);

    expect(str).not.toContain('GitBookExpression');
  });
});
