# Heading between consecutive embeds disappears

## Problem

On the Embeds page, the `## CodePen - Pen Settings` heading between the YouTube embed and the CodePen embed is not rendered. The two embeds appear back-to-back with no heading in between.

## Expected

```
## YouTube Video
[youtube embed]

## CodePen - Pen Settings
[codepen embed]

## Syntax
...
```

## Actual

```
## YouTube Video
[youtube embed]
[codepen embed]
(everything after is also missing — see content-after-block-disappears.md)
```

## Root cause

The `collectBlockNodes` function likely starts collecting from the YouTube embed paragraph and, finding the CodePen embed in a subsequent paragraph, treats the heading in between as part of the same block group. The heading node gets consumed and replaced along with the embed nodes.

This is related to the broader "content after block disappears" issue but specifically affects headings between consecutive self-closing embed blocks.

## Files to investigate

- `src/remark/plugin.ts` — `collectBlockNodes()` and the logic for handling consecutive self-closing blocks like `{% embed url="..." %}`
