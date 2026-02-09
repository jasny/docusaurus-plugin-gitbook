import { describe, it, expect } from 'vitest';
import { remarkParsed, astToString } from './helpers.js';

describe('hint block', () => {
  it('transforms info hint to Admonition', () => {
    const tree = remarkParsed(`{% hint style="info" %}
This is an info hint.
{% endhint %}`);
    const str = astToString(tree);

    expect(str).toContain('Admonition');
    expect(str).toContain('"type","value":"info"');
  });

  it('transforms warning hint to Admonition', () => {
    const tree = remarkParsed(`{% hint style="warning" %}
Be careful!
{% endhint %}`);
    const str = astToString(tree);

    expect(str).toContain('Admonition');
    expect(str).toContain('"type","value":"warning"');
  });

  it('transforms danger hint to Admonition', () => {
    const tree = remarkParsed(`{% hint style="danger" %}
Danger zone!
{% endhint %}`);
    const str = astToString(tree);

    expect(str).toContain('Admonition');
    expect(str).toContain('"type","value":"danger"');
  });

  it('maps success to tip Admonition', () => {
    const tree = remarkParsed(`{% hint style="success" %}
Success!
{% endhint %}`);
    const str = astToString(tree);

    expect(str).toContain('Admonition');
    expect(str).toContain('"type","value":"tip"');
  });

  it('preserves content after the hint', () => {
    const tree = remarkParsed(`{% hint style="info" %}
Hint content.
{% endhint %}

## After Hint

Paragraph after.`);
    const str = astToString(tree);

    expect(str).toContain('Admonition');
    expect(str).toContain('After Hint');
    expect(str).toContain('Paragraph after.');
  });

  it('preserves heading between two hints', () => {
    const tree = remarkParsed(`{% hint style="info" %}
First hint.
{% endhint %}

## Between Hints

{% hint style="warning" %}
Second hint.
{% endhint %}`);
    const str = astToString(tree);

    expect(str).toContain('"value":"info"');
    expect(str).toContain('"value":"warning"');
    expect(str).toContain('Between Hints');
  });

  it('can be disabled via plugin options', () => {
    const tree = remarkParsed(
      `{% hint style="info" %}
Skipped.
{% endhint %}`,
      { blocks: { hint: false } }
    );
    const str = astToString(tree);

    expect(str).not.toContain('mdxJsxFlowElement');
  });
});
