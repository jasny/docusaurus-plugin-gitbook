# Embed URLs rendered as markdown links instead of plain URLs

## Problem

On `/docs/blocks/embeds`, both embed iframes show "Page Not Found" instead of the actual external content (YouTube, CodePen).

The iframe `src` and the "Open in new tab" `href` contain markdown link syntax instead of plain URLs:

```
Expected: https://www.youtube.com/watch?v=dQw4w9WgXcQ
Actual:   [https://www.youtube.com/watch?v=dQw4w9WgXcQ](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
```

This causes the browser to resolve it as a relative path on localhost, showing the Docusaurus 404 page inside the iframe.

## Root cause

Somewhere in the remark transformer or the React component, the URL string is being auto-linked by markdown processing. The URL prop passed to `<GitBookEmbed>` likely goes through remark/MDX processing that converts bare URLs into markdown links `[url](url)`, and this linked form ends up in the iframe `src` attribute.

## Files to investigate

- `src/remark/transformers/embed.ts` — how the `url` attribute is set on the MDX JSX element
- `src/theme/GitBookEmbed/index.tsx` — how the `url` prop is used for the iframe src
- Check if the URL is being passed as a child text node (which would get auto-linked) vs a JSX attribute string (which should not)

## Screenshot

See `embeds-broken.png` in project root.
