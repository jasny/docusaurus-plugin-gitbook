# Task 2.5: Updates Block

Updates display changelog or release notes in reverse chronological order.

## Syntax

```markdown
{% updates format="full" %}
{% update date="2024-01-15" %}
# Version 2.0 Released

Major update with new features.
{% endupdate %}

{% update date="2024-01-01" %}
# Bug Fixes

Fixed several reported issues.
{% endupdate %}
{% endupdates %}
```

## Attributes

- `updates`: `format` - `"full"` or `"compact"` (optional, default: full)
- `update`: `date` (required) - ISO date string

## Component Structure

```typescript
interface UpdatesProps {
  format?: 'full' | 'compact';
  children: React.ReactNode;
}

interface UpdateProps {
  date: string;
  children: React.ReactNode;
}
```

## Rendering

- Timeline-style layout
- Date prominently displayed
- Content rendered as markdown
- Compact mode shows less detail

## Files to Create

- `src/remark/transformers/updates.ts`
- `src/theme/GitBookUpdates/index.tsx`
- `src/theme/GitBookUpdate/index.tsx`
- `src/theme/GitBookUpdates/styles.module.css`

## Test Cases

- Multiple updates
- Different date formats
- Full vs compact format
- Updates with rich content
