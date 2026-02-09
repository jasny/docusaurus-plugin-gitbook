# Task 2.2: Tabs Block

Tabs present alternative content options (e.g., different languages, platforms).

## Syntax

```markdown
{% tabs %}
{% tab title="JavaScript" %}
```javascript
console.log('hello');
```
{% endtab %}

{% tab title="Python" %}
```python
print('hello')
```
{% endtab %}
{% endtabs %}
```

## Attributes

- `tabs`: No attributes on container
- `tab`: `title` (required) - The tab label

## Component Structure

```typescript
interface TabsProps {
  children: React.ReactNode; // Tab components
}

interface TabProps {
  title: string;
  children: React.ReactNode;
}
```

## Rendering

- Tab bar with clickable tab labels
- Only active tab content visible
- Persist tab selection in localStorage (optional)
- Sync tab selection across page (tabs with same titles)

## Implementation Notes

- Need to parse nested `{% tab %}` blocks within `{% tabs %}`
- Each tab's content is independent markdown
- Consider using Docusaurus's built-in Tabs component as base

## Files to Create

- `src/remark/transformers/tabs.ts`
- `src/theme/GitBookTabs/index.tsx`
- `src/theme/GitBookTab/index.tsx`
- `src/theme/GitBookTabs/styles.module.css`

## Test Cases

- Two tabs with simple content
- Multiple tabs (3+)
- Tabs with code blocks
- Tabs with nested markdown (lists, headings)
- Nested blocks inside tabs (hints, etc.)
