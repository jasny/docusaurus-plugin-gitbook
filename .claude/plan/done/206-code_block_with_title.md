# Task 2.6: Code Block with Title

Code blocks wrapped with a title/filename header.

## Syntax

````markdown
{% code title="index.js" %}
```javascript
const foo = 'bar';
console.log(foo);
```
{% endcode %}

{% code title="config.yaml" lineNumbers="true" %}
```yaml
setting: value
```
{% endcode %}
````

## Attributes

- `title`: Filename or title to display (required)
- `lineNumbers`: `"true"` | `"false"` (optional)
- `overflow`: `"wrap"` | `"scroll"` (optional)

## Component Structure

```typescript
interface CodeBlockProps {
  title: string;
  lineNumbers?: boolean;
  overflow?: 'wrap' | 'scroll';
  children: React.ReactNode; // The code block
}
```

## Rendering

- Header bar with title/filename
- Optional copy button
- Code block rendered below header
- Line numbers if enabled

## Implementation Notes

- The inner content is a standard markdown code fence
- Need to preserve language highlighting
- Consider integrating with Docusaurus's existing code block features

## Files to Create

- `src/remark/transformers/code.ts`
- `src/theme/GitBookCodeBlock/index.tsx`
- `src/theme/GitBookCodeBlock/styles.module.css`

## Test Cases

- Code with title only
- Code with line numbers
- Different languages
- Long code blocks
