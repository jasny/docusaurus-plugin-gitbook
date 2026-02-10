# OpenAPI spec URLs rendered as markdown links instead of plain URLs

## Problem

On `/docs/blocks/openapi`, all three OpenAPI blocks fail with:
> Failed to load spec: Unexpected token '<', "<!DOCTYPE "... is not valid JSON

The spec URL and "View OpenAPI Spec" link contain markdown link syntax instead of plain URLs:

```
Expected: https://petstore3.swagger.io/api/v3/openapi.json
Actual:   [https://petstore3.swagger.io/api/v3/openapi.json](https://petstore3.swagger.io/api/v3/openapi.json)
```

This causes the fetch to hit localhost (returning the Docusaurus 404 HTML page), which fails JSON parsing.

## Root cause

Same underlying issue as the embeds bug (`embed-urls-broken.md`). URL attribute values passed through the remark plugin are being auto-linked by markdown/MDX processing, converting bare URLs into markdown link syntax `[url](url)`. This affects any component that receives a URL as a prop.

## Related

- `todo/embed-urls-broken.md` — same root cause affecting embed iframes

## Files to investigate

- `src/remark/transformers/embed.ts` — how URL attributes are passed
- `src/remark/utils.ts` — how MDX JSX attributes are constructed
- The remark autolink plugin may be transforming URL strings inside JSX attribute values

## Screenshot

See `openapi-broken.png` in project root.
