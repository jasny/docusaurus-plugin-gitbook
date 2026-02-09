# Buttons and Cards

These are HTML-based blocks that get transformed into styled components.

## Buttons

Buttons are created using anchor tags with the `button` class.

### Primary Button

<a href="https://example.com" class="button primary">Get Started</a>

### Secondary Button

<a href="https://docs.example.com" class="button secondary">Read Documentation</a>

### Button Syntax

```html
<a href="https://example.com" class="button primary">Get Started</a>
<a href="https://docs.example.com" class="button secondary">Documentation</a>
```

## Cards

Cards are created using tables with `data-view="cards"` attribute.

<table data-view="cards">
  <thead>
    <tr>
      <th>Title</th>
      <th data-card-target data-type="content-ref">Target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Getting Started</td>
      <td><a href="/docs/intro">Quick Start Guide</a></td>
    </tr>
    <tr>
      <td>Hints</td>
      <td><a href="/docs/blocks/hints">Learn about hints</a></td>
    </tr>
    <tr>
      <td>Tabs</td>
      <td><a href="/docs/blocks/tabs">Learn about tabs</a></td>
    </tr>
  </tbody>
</table>

### Card Syntax

```html
<table data-view="cards">
  <thead>
    <tr>
      <th>Title</th>
      <th data-card-target data-type="content-ref">Target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Card Title</td>
      <td><a href="link.md">Card Link</a></td>
    </tr>
  </tbody>
</table>
```

## Icons

Icons can be added using Font Awesome classes:

<i class="fa-brands fa-github"></i> GitHub
<i class="fa-solid fa-check"></i> Completed

### Icon Syntax

```html
<i class="fa-brands fa-github"></i>
<i class="fa-solid fa-check"></i>
```
