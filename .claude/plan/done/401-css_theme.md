# Task 4.1: CSS Theme

Create cohesive styling for all GitBook components.

## Requirements

- CSS variables for theming (colors, spacing, fonts)
- Light/dark mode support
- Consistent with Docusaurus default theme
- Responsive design

## CSS Variables

```css
:root {
  --gitbook-hint-info-bg: #e7f3ff;
  --gitbook-hint-info-border: #0969da;
  --gitbook-hint-warning-bg: #fff8e6;
  --gitbook-hint-warning-border: #9a6700;
  --gitbook-hint-danger-bg: #ffebe9;
  --gitbook-hint-danger-border: #cf222e;
  --gitbook-hint-success-bg: #dafbe1;
  --gitbook-hint-success-border: #1a7f37;
  /* ... more variables */
}

[data-theme='dark'] {
  --gitbook-hint-info-bg: #1c3a5e;
  /* ... dark mode overrides */
}
```

## Files to Create

- `src/theme/gitbook.css` - Global GitBook styles
- Update CSS module files for each component
