# Task 3.3: Icon Block

Inline Font Awesome icons.

## Syntax

```html
<i class="fa-check">check</i> Feature enabled
<i class="fa-warning">warning</i> Requires configuration
<i class="fa-info-circle">info</i> Learn more
```

## Detection

- `<i>` element with `class` starting with `"fa-"`

## Component Structure

```typescript
interface IconProps {
  name: string; // Icon name without fa- prefix
}
```

## Rendering

- SVG icon or icon font
- Inline with text
- Inherit text color

## Implementation Options

1. Use Font Awesome library
2. Use a subset of common icons as SVGs
3. Use Docusaurus's icon system

## Files to Create

- `src/rehype/transformers/icon.ts`
- `src/theme/GitBookIcon/index.tsx`
- `src/theme/GitBookIcon/icons/` (SVG icons or icon mapping)

## Test Cases

- Common icons (check, warning, info)
- Icon inline with text
- Unknown icon (fallback)
