import { describe, it, expect } from 'vitest';
import { rehypeParsed, astToString } from './helpers.js';

describe('icon block (rehype)', () => {
  it('transforms fa-brands icon to FAIcon', () => {
    const tree = rehypeParsed(`<i class="fa-brands fa-github"></i>`);
    const str = astToString(tree);

    expect(str).toContain('FAIcon');
    expect(str).toContain('fa-brands fa-github');
  });

  it('transforms fa-solid icon to FAIcon', () => {
    const tree = rehypeParsed(`<i class="fa-solid fa-check"></i>`);
    const str = astToString(tree);

    expect(str).toContain('FAIcon');
    expect(str).toContain('fa-solid fa-check');
  });

  it('does not transform regular italic elements', () => {
    const tree = rehypeParsed(`<i>Italic text</i>`);
    const str = astToString(tree);

    expect(str).not.toContain('FAIcon');
  });
});
