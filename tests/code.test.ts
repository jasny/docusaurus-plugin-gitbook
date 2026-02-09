import { describe, it, expect } from 'vitest';
import { remarkParsed, astToString } from './helpers.js';

describe('code title block', () => {
  it('creates GitBookCodeBlock with title', () => {
    const tree = remarkParsed(`{% code title="example.js" %}
\`\`\`javascript
const foo = 'bar';
\`\`\`
{% endcode %}`);
    const str = astToString(tree);

    expect(str).toContain('GitBookCodeBlock');
    expect(str).toContain('example.js');
  });

  it('parses the inner code fence as a code node', () => {
    const tree = remarkParsed(`{% code title="hello.js" %}
\`\`\`javascript
const greeting = 'hello';
\`\`\`
{% endcode %}`);
    const str = astToString(tree);

    expect(str).toContain('GitBookCodeBlock');
    expect(str).toContain('hello.js');
    expect(str).toContain('"type":"code"');
    expect(str).toContain("const greeting = 'hello'");
  });
});
