# Task 3.4: Expression Block

Dynamic variable expressions.

## Syntax

```html
<code class="expression">space.vars.version</code>
<code class="expression">page.vars.author</code>
<code class="expression">"Hello " + space.vars.name</code>
```

## Detection

- `<code>` element with `class="expression"`

## Implementation Notes

This is complex because:
1. Variables come from `.gitbook/vars.yaml` (space-level) or frontmatter (page-level)
2. Expressions are JavaScript that need evaluation
3. Need to safely evaluate at render time

## Recommended Approach for MVP

- Read variables at build time
- Simple variable substitution (not full JS eval)
- Support `space.vars.x` and `page.vars.x` syntax

## Component Structure

```typescript
interface ExpressionProps {
  expression: string;
  spaceVars: Record<string, string>;
  pageVars: Record<string, string>;
}
```

## Files to Create

- `src/rehype/transformers/expression.ts`
- `src/theme/GitBookExpression/index.tsx`
- `src/utils/variables.ts` - Variable loading utilities

## Test Cases

- Simple space variable
- Simple page variable
- String concatenation
- Unknown variable (fallback)
