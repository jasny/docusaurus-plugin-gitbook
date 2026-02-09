# Task 2.4: Columns Block

Columns display content side-by-side (maximum 2 columns).

## Syntax

```markdown
{% columns %}
{% column %}
### Left Column

Content on the left side.
{% endcolumn %}

{% column %}
### Right Column

Content on the right side.
{% endcolumn %}
{% endcolumns %}
```

## Attributes

- `columns`: No attributes
- `column`: No attributes

## Component Structure

```typescript
interface ColumnsProps {
  children: React.ReactNode; // Column components
}

interface ColumnProps {
  children: React.ReactNode;
}
```

## Rendering

- Flexbox or CSS Grid layout
- Equal width columns (50/50)
- Stack vertically on mobile (responsive)
- Gap between columns

## Files to Create

- `src/remark/transformers/columns.ts`
- `src/theme/GitBookColumns/index.tsx`
- `src/theme/GitBookColumn/index.tsx`
- `src/theme/GitBookColumns/styles.module.css`

## Test Cases

- Two columns with text
- Columns with mixed content (one text, one code)
- Responsive behavior
- Columns with nested blocks
