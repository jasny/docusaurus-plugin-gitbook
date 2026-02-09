/**
 * Tests for the remark plugin
 */

import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import type { Root } from 'mdast';
import remarkGitBook from '../plugin.js';

// Helper to get the AST
function getAst(markdown: string): Promise<Root> {
  const processor = unified().use(remarkParse).use(remarkGitBook);
  const tree = processor.parse(markdown);
  processor.runSync(tree);
  return Promise.resolve(tree as Root);
}

describe('remarkGitBook plugin', () => {
  describe('hint blocks', () => {
    it('should transform info hint to Admonition', async () => {
      const markdown = `{% hint style="info" %}
This is an info hint.
{% endhint %}`;

      const tree = await getAst(markdown);
      const str = JSON.stringify(tree);
      expect(str).toContain('Admonition');
      expect(str).toContain('"type","value":"info"');
    });

    it('should transform warning hint to Admonition', async () => {
      const markdown = `{% hint style="warning" %}
Be careful!
{% endhint %}`;

      const tree = await getAst(markdown);
      const str = JSON.stringify(tree);
      expect(str).toContain('Admonition');
      expect(str).toContain('"type","value":"warning"');
    });

    it('should transform danger hint to Admonition', async () => {
      const markdown = `{% hint style="danger" %}
Danger zone!
{% endhint %}`;

      const tree = await getAst(markdown);
      const str = JSON.stringify(tree);
      expect(str).toContain('Admonition');
      expect(str).toContain('"type","value":"danger"');
    });

    it('should transform success hint to tip Admonition', async () => {
      const markdown = `{% hint style="success" %}
Success!
{% endhint %}`;

      const tree = await getAst(markdown);
      const str = JSON.stringify(tree);
      expect(str).toContain('Admonition');
      expect(str).toContain('"type","value":"tip"');
    });
  });

  describe('tabs blocks', () => {
    it('should transform tabs with multiple tabs', async () => {
      const markdown = `{% tabs %}
{% tab title="JavaScript" %}
\`\`\`javascript
console.log('Hello');
\`\`\`
{% endtab %}
{% tab title="Python" %}
\`\`\`python
print('Hello')
\`\`\`
{% endtab %}
{% endtabs %}`;

      const tree = await getAst(markdown);
      const str = JSON.stringify(tree);
      expect(str).toContain('GitBookTabs');
      expect(str).toContain('GitBookTab');
      expect(str).toContain('JavaScript');
      expect(str).toContain('Python');
    });
  });

  describe('stepper blocks', () => {
    it('should transform stepper with steps', async () => {
      const markdown = `{% stepper %}
{% step %}
## Step 1
First step content.
{% endstep %}
{% step %}
## Step 2
Second step content.
{% endstep %}
{% endstepper %}`;

      const tree = await getAst(markdown);
      const str = JSON.stringify(tree);
      expect(str).toContain('GitBookStepper');
      expect(str).toContain('GitBookStep');
    });
  });

  describe('columns blocks', () => {
    it('should transform columns with content', async () => {
      const markdown = `{% columns %}
{% column %}
Left content.
{% endcolumn %}
{% column %}
Right content.
{% endcolumn %}
{% endcolumns %}`;

      const tree = await getAst(markdown);
      const str = JSON.stringify(tree);
      expect(str).toContain('GitBookColumns');
      expect(str).toContain('GitBookColumn');
    });
  });

  describe('embed blocks', () => {
    it('should transform YouTube embed', async () => {
      const markdown = `{% embed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" %}`;

      const tree = await getAst(markdown);
      const str = JSON.stringify(tree);
      expect(str).toContain('GitBookEmbed');
      expect(str).toContain('youtube.com');
    });
  });

  describe('file blocks', () => {
    it('should transform file block', async () => {
      const markdown = `{% file src="/path/to/file.pdf" %}
Download the PDF.
{% endfile %}`;

      const tree = await getAst(markdown);
      const str = JSON.stringify(tree);
      expect(str).toContain('GitBookFile');
      expect(str).toContain('/path/to/file.pdf');
    });
  });

  describe('code blocks', () => {
    it('should transform code block with title', async () => {
      const markdown = `{% code title="example.js" %}
\`\`\`javascript
const foo = 'bar';
\`\`\`
{% endcode %}`;

      const tree = await getAst(markdown);
      const str = JSON.stringify(tree);
      expect(str).toContain('GitBookCodeBlock');
      expect(str).toContain('example.js');
    });
  });

  describe('include blocks', () => {
    it('should transform include block', async () => {
      const markdown = `{% include ".gitbook/includes/disclaimer.md" %}`;

      const tree = await getAst(markdown);
      const str = JSON.stringify(tree);
      expect(str).toContain('GitBookInclude');
      expect(str).toContain('.gitbook/includes/disclaimer.md');
    });
  });

  describe('openapi blocks', () => {
    it('should transform openapi block', async () => {
      const markdown = `{% openapi src="https://api.example.com/openapi.json" path="/users" method="get" %}
{% endopenapi %}`;

      const tree = await getAst(markdown);
      const str = JSON.stringify(tree);
      expect(str).toContain('GitBookOpenAPI');
      expect(str).toContain('/users');
      expect(str).toContain('GET');
    });
  });

  describe('plugin options', () => {
    it('should skip disabled blocks', async () => {
      const markdown = `{% hint style="info" %}
This should be skipped.
{% endhint %}`;

      const processor = unified()
        .use(remarkParse)
        .use(remarkGitBook, { blocks: { hint: false } });
      const tree = processor.parse(markdown);
      processor.runSync(tree);
      const str = JSON.stringify(tree);

      // The hint should not be transformed - no Admonition JSX element created
      expect(str).not.toContain('mdxJsxFlowElement');
    });
  });
});
