import { describe, it, expect } from 'vitest';
import { remarkParsed, astToString } from './helpers.js';

describe('openapi block', () => {
  it('transforms openapi with src, path and method', () => {
    const tree = remarkParsed(`{% openapi src="https://api.example.com/openapi.json" path="/users" method="get" %}
{% endopenapi %}`);
    const str = astToString(tree);

    expect(str).toContain('GitBookOpenAPI');
    expect(str).toContain('/users');
    expect(str).toContain('GET');
  });
});
