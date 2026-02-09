# Task 1.5: Plugin Entry Point

Wire together all plugin parts into the main Docusaurus plugin export.

## Requirements

- Export default plugin function for Docusaurus
- Export remark plugin separately for direct use
- Export rehype plugin separately for direct use
- Configure theme path for component resolution
- Handle plugin options

## Plugin Options Interface

```typescript
interface PluginOptions {
  // Enable/disable specific blocks
  blocks?: {
    hint?: boolean;
    tabs?: boolean;
    // ...
  };
  // Custom class name prefix
  classNamePrefix?: string;
  // Path to custom CSS
  customCss?: string;
}
```

## Files to Modify

- `src/index.ts` - Main plugin entry point
