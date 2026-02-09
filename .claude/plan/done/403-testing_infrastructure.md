# Task 4.3: Testing Infrastructure

Set up comprehensive testing.

## Requirements

- Unit tests for parser
- Unit tests for transformers
- Integration tests with sample markdown
- Snapshot tests for components

## Test Structure

```
src/
  parser/__tests__/
    tokenizer.test.ts
    parser.test.ts
  remark/__tests__/
    plugin.test.ts
    transformers/
      hint.test.ts
      tabs.test.ts
      ...
  rehype/__tests__/
    plugin.test.ts
    transformers/
      button.test.ts
      ...
  theme/__tests__/
    GitBookHint.test.tsx
    ...
```

## Test Types

1. **Parser tests**: Input string → parsed structure
2. **Transformer tests**: MDAST/HAST node → transformed node
3. **Integration tests**: Full markdown → rendered output
4. **Snapshot tests**: Component rendering

## Files to Create

- Test files for each module
- Test fixtures (sample markdown files)
- Test utilities
