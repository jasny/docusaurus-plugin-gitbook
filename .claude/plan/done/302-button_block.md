# Task 3.2: Button Block

Styled button links.

## Syntax

```html
<a href="https://example.com" class="button primary">Get Started</a>
<a href="https://docs.example.com" class="button secondary">Documentation</a>
<a href="https://github.com/user/repo" class="button primary" data-icon="github">View on GitHub</a>
```

## Detection

- `<a>` element with `class` containing `"button"`

## Attributes from HTML

- `href`: Link destination
- `class`: Contains `"button"` and optionally `"primary"` or `"secondary"`
- `data-icon`: Optional Font Awesome icon name

## Component Structure

```typescript
interface ButtonProps {
  href: string;
  variant: 'primary' | 'secondary';
  icon?: string;
  children: React.ReactNode;
}
```

## Rendering

- Styled button appearance
- Primary: filled background
- Secondary: outlined
- Optional icon before text

## Files to Create

- `src/rehype/transformers/button.ts`
- `src/theme/GitBookButton/index.tsx`
- `src/theme/GitBookButton/styles.module.css`

## Test Cases

- Primary button
- Secondary button
- Button with icon
- Button without icon
