import { describe, it, expect } from 'vitest';
import { tokenize, parseAttributes, parse, findBlocks } from '../src/parser/index.js';

describe('tokenizer', () => {
  describe('parseAttributes', () => {
    it('parses double-quoted attributes', () => {
      const attrs = parseAttributes('style="info" title="Note"');
      expect(attrs).toEqual({ style: 'info', title: 'Note' });
    });

    it('parses single-quoted attributes', () => {
      const attrs = parseAttributes("style='warning'");
      expect(attrs).toEqual({ style: 'warning' });
    });

    it('parses unquoted attributes', () => {
      const attrs = parseAttributes('lineNumbers=true');
      expect(attrs).toEqual({ lineNumbers: 'true' });
    });

    it('parses boolean attributes', () => {
      const attrs = parseAttributes('hidden');
      expect(attrs).toEqual({ hidden: 'true' });
    });

    it('parses mixed attributes', () => {
      const attrs = parseAttributes('title="Test" lineNumbers=true hidden');
      expect(attrs).toEqual({ title: 'Test', lineNumbers: 'true', hidden: 'true' });
    });
  });

  describe('tokenize', () => {
    it('tokenizes simple tag', () => {
      const segments = tokenize('{% hint style="info" %}content{% endhint %}');
      expect(segments).toHaveLength(3);
      expect(segments[0]).toMatchObject({
        type: 'open',
        name: 'hint',
        attributes: { style: 'info' },
      });
      expect(segments[1]).toMatchObject({
        type: 'text',
        content: 'content',
      });
      expect(segments[2]).toMatchObject({
        type: 'close',
        name: 'hint',
      });
    });

    it('tokenizes self-closing tag', () => {
      const segments = tokenize('{% embed url="https://youtube.com" %}');
      expect(segments).toHaveLength(1);
      expect(segments[0]).toMatchObject({
        type: 'self-closing',
        name: 'embed',
        attributes: { url: 'https://youtube.com' },
      });
    });

    it('preserves text before and after tags', () => {
      const segments = tokenize('Before {% hint %}content{% endhint %} After');
      expect(segments).toHaveLength(5);
      expect(segments[0]).toMatchObject({ type: 'text', content: 'Before ' });
      expect(segments[4]).toMatchObject({ type: 'text', content: ' After' });
    });
  });
});

describe('parser', () => {
  describe('parse', () => {
    it('parses simple block', () => {
      const result = parse('{% hint style="info" %}This is a hint{% endhint %}');
      expect(result.errors).toHaveLength(0);
      expect(result.blocks).toHaveLength(1);
      expect(result.blocks[0]).toMatchObject({
        name: 'hint',
        attributes: { style: 'info' },
        content: 'This is a hint',
      });
    });

    it('parses nested blocks', () => {
      const input = `{% tabs %}
{% tab title="JS" %}
JavaScript code
{% endtab %}
{% tab title="Python" %}
Python code
{% endtab %}
{% endtabs %}`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.blocks).toHaveLength(1);
      expect(result.blocks[0].name).toBe('tabs');
      expect(result.blocks[0].children).toHaveLength(2);
      expect(result.blocks[0].children[0]).toMatchObject({
        name: 'tab',
        attributes: { title: 'JS' },
      });
      expect(result.blocks[0].children[1]).toMatchObject({
        name: 'tab',
        attributes: { title: 'Python' },
      });
    });

    it('parses deeply nested blocks', () => {
      const input = `{% tabs %}
{% tab title="Example" %}
{% hint style="warning" %}
Be careful!
{% endhint %}
{% endtab %}
{% endtabs %}`;

      const result = parse(input);
      expect(result.errors).toHaveLength(0);
      expect(result.blocks[0].children[0].children).toHaveLength(1);
      expect(result.blocks[0].children[0].children[0].name).toBe('hint');
    });

    it('reports unclosed tags', () => {
      const result = parse('{% hint %}content');
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].message).toContain('Unclosed tag');
    });

    it('reports orphan close tags', () => {
      const result = parse('{% endhint %}');
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].message).toContain('Unexpected closing tag');
    });

    it('parses self-closing tags', () => {
      const result = parse('{% embed url="https://youtube.com/watch" %}');
      expect(result.errors).toHaveLength(0);
      expect(result.blocks).toHaveLength(1);
      expect(result.blocks[0]).toMatchObject({
        name: 'embed',
        attributes: { url: 'https://youtube.com/watch' },
      });
    });
  });

  describe('findBlocks', () => {
    it('finds blocks by name', () => {
      const result = parse(`
{% tabs %}
{% tab title="A" %}{% endhint %}{% endtab %}
{% tab title="B" %}{% endtab %}
{% endtabs %}
{% hint style="info" %}Info{% endhint %}
`);
      const hints = findBlocks(result.blocks, 'hint');
      expect(hints).toHaveLength(1);

      const tabs = findBlocks(result.blocks, 'tab');
      expect(tabs).toHaveLength(2);
    });
  });
});
