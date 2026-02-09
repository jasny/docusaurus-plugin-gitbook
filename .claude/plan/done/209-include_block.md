# Task 2.9: Include Block

Include reusable content from other files.

## Syntax

```markdown
{% include ".gitbook/includes/disclaimer.md" %}

{% include "/reusable-content/rc12345" %}
```

## Attributes

- Path to the include file (positional, in quotes)

## Implementation Notes

This is complex because it requires:
1. Reading the included file at build time
2. Parsing the included content as markdown
3. Inserting parsed content in place

## Options for Implementation

1. **Build-time resolution**: Read file during remark transform
2. **Runtime resolution**: Fetch content client-side (not ideal)
3. **Docusaurus partial**: Convert to Docusaurus import syntax

## Recommended Approach

Convert to MDX import/component pattern:

```jsx
import Disclaimer from '.gitbook/includes/disclaimer.md';

<Disclaimer />
```

## Files to Create

- `src/remark/transformers/include.ts`

## Test Cases

- Include local file
- Include from .gitbook/includes
- Nested includes
- Missing file (error handling)
