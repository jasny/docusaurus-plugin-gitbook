# Cards

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

## Syntax

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
