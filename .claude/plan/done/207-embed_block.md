# Task 2.7: Embed Block

Embed external content (YouTube, CodePen, etc.).

## Syntax

```markdown
{% embed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" %}

{% embed url="https://codepen.io/username/pen/example" %}
```

## Attributes

- `url`: The URL to embed (required)

## Component Structure

```typescript
interface EmbedProps {
  url: string;
}
```

## Rendering

- Detect embed type from URL (YouTube, Vimeo, CodePen, Twitter, etc.)
- Render appropriate iframe or embed code
- Responsive container
- Fallback link if embed not supported

## Supported Embed Types

- YouTube (`youtube.com`, `youtu.be`)
- Vimeo (`vimeo.com`)
- CodePen (`codepen.io`)
- CodeSandbox (`codesandbox.io`)
- Twitter/X (`twitter.com`, `x.com`)
- Generic iframe fallback

## Files to Create

- `src/remark/transformers/embed.ts`
- `src/theme/GitBookEmbed/index.tsx`
- `src/theme/GitBookEmbed/styles.module.css`
- `src/theme/GitBookEmbed/providers/youtube.ts`
- `src/theme/GitBookEmbed/providers/vimeo.ts`
- `src/theme/GitBookEmbed/providers/codepen.ts`

## Test Cases

- YouTube embed
- Vimeo embed
- CodePen embed
- Unknown URL (fallback)
