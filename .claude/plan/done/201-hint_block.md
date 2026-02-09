# Task 2.1: Hint Block

Hints are callout boxes for important information with different styles.

## Syntax

```markdown
{% hint style="info" %}
This is an informational hint.
{% endhint %}

{% hint style="warning" %}
Be careful with this action.
{% endhint %}

{% hint style="danger" %}
This cannot be undone!
{% endhint %}

{% hint style="success" %}
Operation completed successfully.
{% endhint %}
```

## Attributes

- `style`: `"info"` | `"warning"` | `"danger"` | `"success"` (required)

## Component Props

```typescript
interface HintProps {
  style: 'info' | 'warning' | 'danger' | 'success';
  children: React.ReactNode;
}
```

## Rendering

- Colored left border or background based on style
- Icon corresponding to style (info circle, warning triangle, etc.)
- Content rendered as markdown

## Files to Create

- `src/remark/transformers/hint.ts`
- `src/theme/GitBookHint/index.tsx`
- `src/theme/GitBookHint/styles.module.css`

## Test Cases

- Each style variant
- Hint with markdown content (bold, links, code)
- Hint with code blocks inside
- Multiple hints in sequence
