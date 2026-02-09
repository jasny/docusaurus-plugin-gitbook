import { describe, it, expect } from 'vitest';
import { remarkParsed, astToString } from './helpers.js';

describe('embed block', () => {
  it('transforms YouTube embed', () => {
    const tree = remarkParsed(
      `{% embed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" %}`
    );
    const str = astToString(tree);

    expect(str).toContain('GitBookEmbed');
    expect(str).toContain('youtube.com');
  });

  it('preserves content after an embed', () => {
    const tree = remarkParsed(`{% embed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" %}

## After Embed

Paragraph after embed.`);
    const str = astToString(tree);

    expect(str).toContain('GitBookEmbed');
    expect(str).toContain('After Embed');
    expect(str).toContain('Paragraph after embed.');
  });

  it('preserves heading between two consecutive embeds', () => {
    const tree = remarkParsed(`## First Embed

{% embed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" %}

## Second Embed

{% embed url="https://codepen.io/team/codepen/pen/PNaGbb" %}`);
    const str = astToString(tree);

    expect(str).toContain('youtube.com');
    expect(str).toContain('codepen.io');
    expect(str).toContain('First Embed');
    expect(str).toContain('Second Embed');
  });
});
