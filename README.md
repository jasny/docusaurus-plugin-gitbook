# docusaurus-plugin-gitbook

A [Docusaurus plugin](https://docusaurus.io/docs/advanced/plugins) that adds support for GitBook-specific block syntax in MDX files.

📖 **[Full Documentation](https://www.jasny.net/docusaurus-plugin-gitbook/)**

## Supported Blocks

| Block | Description | Docs |
|-------|-------------|------|
| Cover | Page cover image from frontmatter (dark/light mode variants) | [View](https://www.jasny.net/docusaurus-plugin-gitbook/blocks/cover) |
| Hints | Info, warning, danger, and success callouts | [View](https://www.jasny.net/docusaurus-plugin-gitbook/blocks/hints) |
| Tabs | Tabbed content panels | [View](https://www.jasny.net/docusaurus-plugin-gitbook/blocks/tabs) |
| Stepper | Numbered step-by-step guides | [View](https://www.jasny.net/docusaurus-plugin-gitbook/blocks/stepper) |
| Columns | Side-by-side column layouts | [View](https://www.jasny.net/docusaurus-plugin-gitbook/blocks/columns) |
| Code blocks | Code blocks with titles and line numbers | [View](https://www.jasny.net/docusaurus-plugin-gitbook/blocks/code) |
| Embeds | Embedded external content (YouTube, etc.) | [View](https://www.jasny.net/docusaurus-plugin-gitbook/blocks/embeds) |
| Files | File download links | [View](https://www.jasny.net/docusaurus-plugin-gitbook/blocks/files) |
| Buttons | Primary and secondary action buttons | [View](https://www.jasny.net/docusaurus-plugin-gitbook/blocks/buttons) |
| Cards | Card grid layouts | [View](https://www.jasny.net/docusaurus-plugin-gitbook/blocks/cards) |
| Icons | Font Awesome icons | [View](https://www.jasny.net/docusaurus-plugin-gitbook/blocks/icons) |
| OpenAPI | OpenAPI/Swagger endpoint documentation | [View](https://www.jasny.net/docusaurus-plugin-gitbook/blocks/openapi) |

## Installation

```bash
npm install docusaurus-plugin-gitbook
# or
yarn add docusaurus-plugin-gitbook
```

## Configuration

Add the plugin to your `docusaurus.config.js`:

```javascript
export default {
  plugins: ['docusaurus-plugin-gitbook'],

  // Or with options:
  plugins: [
    ['docusaurus-plugin-gitbook', {
      // options
    }]
  ],
};
```

### Using as Remark/Rehype plugins directly

You can also use the remark and rehype plugins directly:

```javascript
import { remarkGitBook, rehypeGitBook } from 'docusaurus-plugin-gitbook';

export default {
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          remarkPlugins: [remarkGitBook],
          rehypePlugins: [rehypeGitBook],
        },
      },
    ],
  ],
};
```

## Usage

### Cover

Page cover images are rendered automatically from the `cover` frontmatter field GitBook adds to your pages:

```markdown
---
cover: /assets/banner.png
coverY: 0
---
```

For dark/light mode variants:

```markdown
---
cover:
  dark: /assets/banner-dark.png
  light: /assets/banner-light.png
---
```

The plugin copies `.gitbook/assets` to `/assets` in your build output.
References to `.gitbook/assets/...` are automatically rewritten to `/assets/...` during processing.
If a file would overwrite an existing file under `static/assets`, the build fails with a clear conflict error.

### Hint

```markdown
{% hint style="info" %}
This is an informational hint.
{% endhint %}

{% hint style="warning" %}
Be careful with this action.
{% endhint %}

{% hint style="danger" %}
This action cannot be undone!
{% endhint %}

{% hint style="success" %}
Operation completed successfully.
{% endhint %}
```

### Tabs

```markdown
{% tabs %}
{% tab title="JavaScript" %}
\`\`\`javascript
console.log('Hello');
\`\`\`
{% endtab %}

{% tab title="Python" %}
\`\`\`python
print('Hello')
\`\`\`
{% endtab %}
{% endtabs %}
```

### Stepper

```markdown
{% stepper %}
{% step %}
## Step 1
First step content.
{% endstep %}

{% step %}
## Step 2
Second step content.
{% endstep %}
{% endstepper %}
```

### Columns

```markdown
{% columns %}
{% column %}
Left column content.
{% endcolumn %}

{% column %}
Right column content.
{% endcolumn %}
{% endcolumns %}
```

### Code with Title

```markdown
{% code title="example.js" %}
\`\`\`javascript
const foo = 'bar';
\`\`\`
{% endcode %}
```

### Embed

```markdown
{% embed url="https://www.youtube.com/watch?v=VIDEO_ID" %}
```

### File

```markdown
{% file src="/path/to/file.pdf" %}
Optional description.
{% endfile %}
```

### Button (HTML)

```html
<a href="https://example.com" class="button primary">Get Started</a>
<a href="https://docs.example.com" class="button secondary">Documentation</a>
```

### Cards (HTML)

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
            <td>Getting Started</td>
            <td><a href="getting-started.md">Quick Start</a></td>
        </tr>
    </tbody>
</table>
```

## Styling

The plugin includes default styles that work with Docusaurus's light and dark themes. You can customize the appearance using CSS variables:

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
```

## License

MIT
