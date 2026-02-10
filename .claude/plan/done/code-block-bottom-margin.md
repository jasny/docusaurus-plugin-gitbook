# Extra bottom margin inside GitBookCodeBlock

## Problem

On `/docs/blocks/code`, the titled code blocks (GitBookCodeBlock) have extra whitespace at the bottom of the code area, below the last line of code. This is most visible in dark mode.

## Root cause

The Docusaurus `codeBlockContainer` (`.codeBlockContainer_Ckt0`) nested inside the GitBookCodeBlock's `.content` wrapper has `margin-bottom: 20px` by default. Since it's inside the GitBookCodeBlock container, this margin creates unwanted extra space between the last line of code and the bottom edge of the block.

## Fix

Override the margin on the nested `.codeBlockContainer` inside the GitBookCodeBlock component's CSS:

```css
.content :global(.codeBlockContainer) {
  margin-bottom: 0;
}
```

## Files to modify

- `src/theme/GitBookCodeBlock/styles.module.css` — add override for nested codeBlockContainer margin

## Screenshot

See `code-block-margin.png` and `code-blocks-dark-mode.png` in project root.
