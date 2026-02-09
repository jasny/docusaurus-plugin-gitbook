# Task 1.4: React Component Infrastructure

Set up the React component system that renders GitBook blocks.

## Requirements

- Create a theme directory structure compatible with Docusaurus
- Set up component exports that can be swizzled
- Create base component types and interfaces

## Directory Structure

```
src/
  theme/
    GitBookHint/
      index.tsx
      styles.module.css
    GitBookTabs/
      index.tsx
      styles.module.css
    ...
```

## Plugin Theme Integration

Plugin must expose theme components:

```typescript
// In plugin index.ts
{
  name: 'docusaurus-plugin-gitbook',
  getThemePath() {
    return '../lib/theme';
  },
}
```

## Files to Create

- `src/theme/index.ts` - Export all theme components
- `src/theme/types.ts` - Shared TypeScript interfaces
