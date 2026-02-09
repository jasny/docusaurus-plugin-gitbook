# Task 2.8: File Block

File download blocks with description.

## Syntax

```markdown
{% file src="https://example.com/document.pdf" %}
Complete documentation in PDF format.
{% endfile %}

{% file src=".gitbook/assets/guide.pdf" %}
Download the user guide.
{% endfile %}
```

## Attributes

- `src`: URL or path to the file (required)

## Component Structure

```typescript
interface FileProps {
  src: string;
  children?: React.ReactNode; // Description
}
```

## Rendering

- File icon based on extension
- Filename extracted from URL/path
- Download link
- Optional description below

## Files to Create

- `src/remark/transformers/file.ts`
- `src/theme/GitBookFile/index.tsx`
- `src/theme/GitBookFile/styles.module.css`

## Test Cases

- PDF file
- Image file
- File with description
- File without description
- Relative path file
- External URL file
