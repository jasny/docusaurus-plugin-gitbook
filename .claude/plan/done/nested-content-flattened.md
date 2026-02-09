# Nested content inside blocks is flattened to plain text

## Problem

Rich markdown content inside GitBook blocks (headings, code blocks, lists, inline code) is rendered as a single flat paragraph of text instead of being properly parsed as markdown.

## Affected pages

- **Tabs** (`/docs/blocks/tabs`): Tab panels are empty — the code blocks inside each tab are not rendered at all
- **Stepper** (`/docs/blocks/stepper`): Each step's `## Heading` is merged into the paragraph text (e.g., "Install Dependencies First, install the required dependencies using npm or yarn:"). Code blocks inside steps are missing entirely. Inline code like `docusaurus.config.js` is stripped (step 2 shows "Add the plugin to your :").
- **Columns** (`/docs/blocks/columns`): Column headings (`### Left Column`) are merged into paragraph text. Bullet lists are concatenated without spacing ("Comparing featuresShowing before/afterSide-by-side code examples").
- **Code Blocks** (`/docs/blocks/code`): The code block inside `{% code %}` is missing — only the title "hello.js" renders.

## Root cause

In `src/remark/plugin.ts`, the `parseMarkdownContent()` function is a simplified stub that returns block content as a single text paragraph:

```typescript
return [
  {
    type: 'paragraph',
    children: [{ type: 'text', value: content }],
  },
];
```

The TODO comment in the code acknowledges this: "For now, return as a simple text paragraph. This will be enhanced to properly parse nested markdown."

The content string (which contains headings, code fences, lists, etc.) needs to be run through a proper markdown parser (e.g., `unified().use(remarkParse).parse(content)`) to produce a real MDAST subtree.

## Files to fix

- `src/remark/plugin.ts` — `parseMarkdownContent()` function
