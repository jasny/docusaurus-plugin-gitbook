import { describe, it, expect } from 'vitest';
import { remarkParsed, astToString } from './helpers.js';

describe('tabs block', () => {
  it('creates GitBookTabs and GitBookTab elements', () => {
    const tree = remarkParsed(`{% tabs %}
{% tab title="JavaScript" %}
Some content.
{% endtab %}
{% tab title="Python" %}
Other content.
{% endtab %}
{% endtabs %}`);
    const str = astToString(tree);

    expect(str).toContain('GitBookTabs');
    expect(str).toContain('GitBookTab');
    expect(str).toContain('JavaScript');
    expect(str).toContain('Python');
  });

  it('parses code blocks inside tab panels', () => {
    const tree = remarkParsed(`{% tabs %}
{% tab title="JS" %}
\`\`\`javascript
console.log('Hello');
\`\`\`
{% endtab %}
{% endtabs %}`);
    const str = astToString(tree);

    expect(str).toContain('GitBookTab');
    expect(str).toContain('"type":"code"');
    expect(str).toContain("console.log('Hello')");
  });

  it('preserves content after the tabs block', () => {
    const tree = remarkParsed(`{% tabs %}
{% tab title="Tab1" %}
Tab content.
{% endtab %}
{% endtabs %}

## After Tabs

Paragraph after tabs.`);
    const str = astToString(tree);

    expect(str).toContain('GitBookTabs');
    expect(str).toContain('After Tabs');
    expect(str).toContain('Paragraph after tabs.');
  });
});
