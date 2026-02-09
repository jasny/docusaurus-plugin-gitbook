# Task 1.2: Remark Plugin Infrastructure

Create the base remark plugin that integrates with Docusaurus.

## Requirements

- Export a remark plugin function that receives options
- Use `unist-util-visit` to traverse the MDAST
- Identify text nodes or paragraph nodes containing GitBook syntax
- Transform them into appropriate MDAST nodes (likely `mdxJsxFlowElement` for JSX components)

## Docusaurus Integration

```javascript
// In docusaurus.config.js
{
  docs: {
    remarkPlugins: [
      [require('docusaurus-plugin-gitbook').remarkPlugin, { /* options */ }]
    ],
  }
}
```

## Files to Create

- `src/remark/plugin.ts` - Main remark plugin
- `src/remark/transformers/index.ts` - Block transformer registry
- `src/remark/utils.ts` - MDAST manipulation utilities

## Key Considerations

- GitBook blocks can span multiple paragraphs
- Content inside blocks should still be parsed as markdown
- Need to handle the raw text → parsed markdown → JSX component flow
