# Task 3.1: Cards Block

Card grid for navigation using HTML tables.

## Syntax

```html
<table data-view="cards">
    <thead>
        <tr>
            <th>Title</th>
            <th data-card-target data-type="content-ref">Target</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Getting Started</td>
            <td><a href="getting-started.md">Quick Start</a></td>
        </tr>
        <tr>
            <td>API Reference</td>
            <td><a href="api/overview.md">API Docs</a></td>
        </tr>
    </tbody>
</table>
```

## Detection

- `<table>` element with `data-view="cards"` attribute

## Component Structure

```typescript
interface CardsProps {
  cards: Array<{
    title: string;
    href: string;
    linkText: string;
  }>;
}
```

## Rendering

- Grid of clickable cards
- Card shows title prominently
- Hover effect
- Responsive grid (2-3 columns on desktop, 1 on mobile)

## Files to Create

- `src/rehype/transformers/cards.ts`
- `src/theme/GitBookCards/index.tsx`
- `src/theme/GitBookCard/index.tsx`
- `src/theme/GitBookCards/styles.module.css`

## Test Cases

- Table with 2 cards
- Table with many cards
- Cards with various link types
