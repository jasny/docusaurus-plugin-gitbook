import { describe, it, expect } from 'vitest';
import { rehypeParsed, astToString } from './helpers.js';

describe('button block (rehype)', () => {
  it('transforms primary button', () => {
    const tree = rehypeParsed(
      `<a href="https://example.com" class="button primary">Get Started</a>`
    );
    const str = astToString(tree);

    expect(str).toContain('GitBookButton');
    expect(str).toContain('primary');
    expect(str).toContain('https://example.com');
  });

  it('transforms secondary button', () => {
    const tree = rehypeParsed(
      `<a href="https://docs.example.com" class="button secondary">Documentation</a>`
    );
    const str = astToString(tree);

    expect(str).toContain('GitBookButton');
    expect(str).toContain('secondary');
  });

  it('defaults to primary when no variant specified', () => {
    const tree = rehypeParsed(
      `<a href="https://example.com" class="button">Click Me</a>`
    );
    const str = astToString(tree);

    expect(str).toContain('GitBookButton');
    expect(str).toContain('primary');
  });

  it('does not transform regular links', () => {
    const tree = rehypeParsed(
      `<a href="https://example.com">Regular Link</a>`
    );
    const str = astToString(tree);

    expect(str).not.toContain('GitBookButton');
  });
});
