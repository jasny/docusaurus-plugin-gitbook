import { describe, it, expect } from 'vitest';
import { remarkParsed, astToString } from './helpers.js';

describe('include block', () => {
  it('transforms include with path', () => {
    const tree = remarkParsed(
      `{% include ".gitbook/includes/disclaimer.md" %}`
    );
    const str = astToString(tree);

    expect(str).toContain('GitBookInclude');
    expect(str).toContain('.gitbook/includes/disclaimer.md');
  });
});
