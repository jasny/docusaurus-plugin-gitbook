# Content after GitBook block disappears

## Problem

On multiple pages, all markdown content that follows a GitBook block is missing from the rendered output. The remark plugin's `collectBlockNodes` function appears to consume too many sibling nodes, swallowing everything after the block.

## Affected pages

- **Tabs** (`/docs/blocks/tabs`): "Syntax" and "Use Cases" sections after `{% endtabs %}` are missing
- **Stepper** (`/docs/blocks/stepper`): "Syntax" and "Use Cases" sections after `{% endstepper %}` are missing
- **Columns** (`/docs/blocks/columns`): "Syntax" and "Use Cases" sections after `{% endcolumns %}` are missing
- **Embeds** (`/docs/blocks/embeds`): "CodePen - Pen Settings" heading, "Syntax", "Supported Platforms", and "Notes" sections are missing
- **Code Blocks** (`/docs/blocks/code`): The Syntax section does appear, but only because the code block is self-contained (single paragraph). The issue is still present in principle.

## Root cause

In `src/remark/plugin.ts`, the `collectBlockNodes` function iterates through sibling nodes starting from the paragraph that contains the `{% %}` opening tag. It tracks depth of open/close tags, but the `endIndex` it returns likely extends beyond the actual block boundary. When the plugin later splices nodes from `startIndex` to `endIndex`, it removes nodes that are not part of the block.

## Files to investigate

- `src/remark/plugin.ts` — `collectBlockNodes()` function and the splice logic in the second pass
