import { describe, it, expect } from 'vitest';
import { remarkParsed, astToString } from './helpers.js';

describe('file block', () => {
  it('transforms file block with src and description', () => {
    const tree = remarkParsed(`{% file src="/path/to/file.pdf" %}
Download the PDF.
{% endfile %}`);
    const str = astToString(tree);

    expect(str).toContain('GitBookFile');
    expect(str).toContain('/path/to/file.pdf');
  });
});
