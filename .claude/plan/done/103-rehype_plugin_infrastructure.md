# Task 1.3: Rehype Plugin Infrastructure

Create the base rehype plugin for HTML-based GitBook syntax.

## HTML-based Blocks to Handle

- `<table data-view="cards">` → Cards component
- `<a class="button primary">` → Button component
- `<a class="button secondary">` → Button component
- `<i class="fa-*">` → Icon component
- `<code class="expression">` → Expression component

## Requirements

- Export a rehype plugin function
- Traverse HAST looking for specific HTML patterns
- Transform matching elements into MDX JSX elements

## Files to Create

- `src/rehype/plugin.ts` - Main rehype plugin
- `src/rehype/transformers/index.ts` - Element transformer registry
