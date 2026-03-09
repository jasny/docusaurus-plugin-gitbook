---
sidebar_position: 100
---

# Customization

The plugin ships with default styles that match GitBook's look and feel. You can override any of these using CSS variables in your `custom.css` file.

## Overriding CSS variables

Add overrides to your Docusaurus `src/css/custom.css`:

```css
:root {
  /* Change the primary accent color */
  --gitbook-primary: #5b21b6;
  --gitbook-primary-hover: #4c1d95;
}
```

## Available variables

### Primary colors

| Variable | Default (light) | Default (dark) | Description |
|----------|-----------------|----------------|-------------|
| `--gitbook-primary` | `#0969da` | `#58a6ff` | Primary accent color |
| `--gitbook-primary-hover` | `#0756b3` | `#79b8ff` | Primary hover color |

### Tabs

| Variable | Default (light) | Default (dark) | Description |
|----------|-----------------|----------------|-------------|
| `--gitbook-tabs-border` | `#e0e0e0` | `#444` | Tab bar border color |
| `--gitbook-tab-color` | `#666` | `#aaa` | Inactive tab text |
| `--gitbook-tab-hover-color` | `#333` | `#ddd` | Tab hover text |
| `--gitbook-tab-active-color` | `#0969da` | `#58a6ff` | Active tab text |
| `--gitbook-tab-active-border` | `#0969da` | `#58a6ff` | Active tab border |

### Stepper

| Variable | Default (light) | Default (dark) | Description |
|----------|-----------------|----------------|-------------|
| `--gitbook-step-bg` | `#0969da` | `#58a6ff` | Step number background |
| `--gitbook-step-color` | `#fff` | `#fff` | Step number text |
| `--gitbook-step-line` | `#e0e0e0` | `#444` | Vertical connector line |

### Updates / Timeline

| Variable | Default (light) | Default (dark) | Description |
|----------|-----------------|----------------|-------------|
| `--gitbook-update-dot` | `#0969da` | `#58a6ff` | Timeline dot color |
| `--gitbook-update-line` | `#e0e0e0` | `#444` | Timeline line color |
| `--gitbook-update-date-color` | `#666` | `#aaa` | Date text color |

### Buttons

| Variable | Default (light) | Default (dark) | Description |
|----------|-----------------|----------------|-------------|
| `--gitbook-button-primary-bg` | `#0969da` | `#58a6ff` | Primary button background |
| `--gitbook-button-primary-color` | `#fff` | `#000` | Primary button text |
| `--gitbook-button-primary-hover-bg` | `#0756b3` | `#79b8ff` | Primary button hover |
| `--gitbook-button-secondary-color` | `#0969da` | `#58a6ff` | Secondary button text |
| `--gitbook-button-secondary-border` | `#0969da` | `#58a6ff` | Secondary button border |
| `--gitbook-button-secondary-hover-bg` | `rgba(9,105,218,0.1)` | `rgba(88,166,255,0.1)` | Secondary button hover |

### Cards

| Variable | Default (light) | Default (dark) | Description |
|----------|-----------------|----------------|-------------|
| `--gitbook-card-border` | `#e0e0e0` | `#444` | Card border color |
| `--gitbook-card-bg` | `#fff` | `#2a2a2a` | Card background |
| `--gitbook-card-hover-border` | `#0969da` | `#58a6ff` | Card hover border |
| `--gitbook-card-title-color` | `#0969da` | `#58a6ff` | Card title color |
| `--gitbook-card-content-color` | `#666` | `#aaa` | Card content text |

### File blocks

| Variable | Default (light) | Default (dark) | Description |
|----------|-----------------|----------------|-------------|
| `--gitbook-file-border` | `#e0e0e0` | `#444` | File block border |
| `--gitbook-file-bg` | `#f9f9f9` | `#2a2a2a` | File block background |
| `--gitbook-file-link-color` | `#0969da` | `#58a6ff` | File link color |
| `--gitbook-file-desc-color` | `#666` | `#aaa` | File description text |

### Embeds

| Variable | Default (light) | Default (dark) | Description |
|----------|-----------------|----------------|-------------|
| `--gitbook-embed-bg` | `#f5f5f5` | `#2a2a2a` | Embed background |
| `--gitbook-embed-link-color` | `#0969da` | `#58a6ff` | Embed link color |

### Code blocks

| Variable | Default (light) | Default (dark) | Description |
|----------|-----------------|----------------|-------------|
| `--gitbook-code-border` | `#e0e0e0` | `#444` | Code block border |
| `--gitbook-code-header-bg` | `#f6f8fa` | `#2a2a2a` | Code title bar background |
| `--gitbook-code-title-color` | `#666` | `#aaa` | Code title text |

## Dark mode

Dark mode overrides are applied automatically via the `[data-theme='dark']` selector. If you need to override dark mode separately:

```css
[data-theme='dark'] {
  --gitbook-primary: #a78bfa;
  --gitbook-primary-hover: #c4b5fd;
}
```

## Swizzling components

For deeper customization, you can [swizzle](https://docusaurus.io/docs/swizzling) any of the theme components:

```bash
npx docusaurus swizzle docusaurus-plugin-gitbook GitBookTabs
```

Available components: `GitBookCover`, `GitBookTabs`, `GitBookTab`, `GitBookStepper`, `GitBookStep`, `GitBookColumns`, `GitBookColumn`, `GitBookUpdates`, `GitBookUpdate`, `GitBookCodeBlock`, `GitBookEmbed`, `GitBookFile`, `GitBookButton`, `GitBookCards`, `GitBookCard`, `FAIcon`.
