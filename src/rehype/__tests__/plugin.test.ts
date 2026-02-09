/**
 * Tests for the rehype plugin
 */

import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import type { Root } from 'hast';
import rehypeGitBook from '../plugin.js';

// Helper to get the AST
function getAst(html: string): Root {
  const processor = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeGitBook);
  const tree = processor.parse(html);
  processor.runSync(tree);
  return tree as Root;
}

describe('rehypeGitBook plugin', () => {
  describe('button transformer', () => {
    it('should transform primary button', () => {
      const html = `<a href="https://example.com" class="button primary">Get Started</a>`;
      const tree = getAst(html);
      const str = JSON.stringify(tree);

      expect(str).toContain('GitBookButton');
      expect(str).toContain('primary');
      expect(str).toContain('https://example.com');
    });

    it('should transform secondary button', () => {
      const html = `<a href="https://docs.example.com" class="button secondary">Documentation</a>`;
      const tree = getAst(html);
      const str = JSON.stringify(tree);

      expect(str).toContain('GitBookButton');
      expect(str).toContain('secondary');
    });

    it('should transform button without variant', () => {
      const html = `<a href="https://example.com" class="button">Click Me</a>`;
      const tree = getAst(html);
      const str = JSON.stringify(tree);

      expect(str).toContain('GitBookButton');
      // Default should be primary
      expect(str).toContain('primary');
    });

    it('should not transform regular links', () => {
      const html = `<a href="https://example.com">Regular Link</a>`;
      const tree = getAst(html);
      const str = JSON.stringify(tree);

      expect(str).not.toContain('GitBookButton');
    });
  });

  describe('icon transformer', () => {
    it('should transform Font Awesome icon', () => {
      const html = `<i class="fa-brands fa-github"></i>`;
      const tree = getAst(html);
      const str = JSON.stringify(tree);

      expect(str).toContain('GitBookIcon');
      // The transformer preserves all fa- classes
      expect(str).toContain('fa-brands fa-github');
    });

    it('should transform solid icon', () => {
      const html = `<i class="fa-solid fa-check"></i>`;
      const tree = getAst(html);
      const str = JSON.stringify(tree);

      expect(str).toContain('GitBookIcon');
      // The transformer preserves all fa- classes
      expect(str).toContain('fa-solid fa-check');
    });

    it('should not transform regular italic elements', () => {
      const html = `<i>Italic text</i>`;
      const tree = getAst(html);
      const str = JSON.stringify(tree);

      expect(str).not.toContain('GitBookIcon');
    });
  });

  describe('expression transformer', () => {
    it('should transform expression code', () => {
      const html = `<code class="expression">product.name</code>`;
      const tree = getAst(html);
      const str = JSON.stringify(tree);

      expect(str).toContain('GitBookExpression');
      expect(str).toContain('product.name');
    });

    it('should not transform regular code', () => {
      const html = `<code>console.log('hello')</code>`;
      const tree = getAst(html);
      const str = JSON.stringify(tree);

      expect(str).not.toContain('GitBookExpression');
    });
  });

  describe('cards transformer', () => {
    it('should transform table with data-view="cards"', () => {
      const html = `<table data-view="cards">
        <thead>
          <tr>
            <th>Title</th>
            <th data-card-target data-type="content-ref">Target</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Getting Started</td>
            <td><a href="getting-started.md">Quick Start</a></td>
          </tr>
        </tbody>
      </table>`;

      const tree = getAst(html);
      const str = JSON.stringify(tree);

      expect(str).toContain('GitBookCards');
      expect(str).toContain('GitBookCard');
    });

    it('should not transform regular tables', () => {
      const html = `<table>
        <tr><td>Cell 1</td><td>Cell 2</td></tr>
      </table>`;

      const tree = getAst(html);
      const str = JSON.stringify(tree);

      expect(str).not.toContain('GitBookCards');
    });
  });
});
