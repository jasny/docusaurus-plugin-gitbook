import { describe, it, expect } from 'vitest';
import { rehypeParsed, astToString } from './helpers.js';

describe('cards block (rehype)', () => {
  it('transforms table with data-view="cards"', () => {
    const tree = rehypeParsed(`<table data-view="cards">
  <thead>
    <tr>
      <th>Title</th>
      <th data-card-target data-type="content-ref">Target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Getting Started</td>
      <td><a href="getting-started.md">Quick Start</a></td>
    </tr>
  </tbody>
</table>`);
    const str = astToString(tree);

    expect(str).toContain('GitBookCards');
    expect(str).toContain('GitBookCard');
  });

  it('does not transform regular tables', () => {
    const tree = rehypeParsed(
      `<table><tr><td>Cell 1</td><td>Cell 2</td></tr></table>`
    );
    const str = astToString(tree);

    expect(str).not.toContain('GitBookCards');
  });
});
