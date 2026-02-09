import { describe, it, expect } from 'vitest';
import { remarkParsed, astToString } from './helpers.js';

describe('columns block', () => {
  it('creates GitBookColumns and GitBookColumn elements', () => {
    const tree = remarkParsed(`{% columns %}
{% column %}
Left content.
{% endcolumn %}
{% column %}
Right content.
{% endcolumn %}
{% endcolumns %}`);
    const str = astToString(tree);

    expect(str).toContain('GitBookColumns');
    expect(str).toContain('GitBookColumn');
  });

  it('parses headings inside columns', () => {
    const tree = remarkParsed(`{% columns %}
{% column %}
### Left Column

Paragraph text.
{% endcolumn %}
{% endcolumns %}`);
    const str = astToString(tree);

    expect(str).toContain('GitBookColumn');
    expect(str).toContain('"type":"heading"');
    expect(str).toContain('Left Column');
  });

  it('parses lists inside columns', () => {
    const tree = remarkParsed(`{% columns %}
{% column %}
- Item one
- Item two
{% endcolumn %}
{% endcolumns %}`);
    const str = astToString(tree);

    expect(str).toContain('GitBookColumn');
    expect(str).toContain('"type":"list"');
    expect(str).toContain('Item one');
    expect(str).toContain('Item two');
  });

  it('preserves content after the columns', () => {
    const tree = remarkParsed(`{% columns %}
{% column %}
Column content.
{% endcolumn %}
{% endcolumns %}

## After Columns

Paragraph after columns.`);
    const str = astToString(tree);

    expect(str).toContain('GitBookColumns');
    expect(str).toContain('After Columns');
    expect(str).toContain('Paragraph after columns.');
  });
});
