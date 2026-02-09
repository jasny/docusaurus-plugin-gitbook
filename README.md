# docusaurus-plugin-gitbook

A [Docusaurus plugin](https://docusaurus.io/docs/advanced/plugins) that adds support for GitBook-specific block syntax in MDX files.

## Supported Blocks

### Remark-based ({% tag %} syntax)

| Block | Description |
|-------|-------------|
| [Hint](https://gitbook.com/docs/creating-content/blocks/hint) | Callout boxes (info, warning, danger, success) |
| [Tabs](https://gitbook.com/docs/creating-content/blocks/tabs) | Tabbed content |
| [Stepper](https://gitbook.com/docs/creating-content/blocks/stepper) | Sequential numbered steps |
| [Columns](https://gitbook.com/docs/creating-content/blocks/columns) | Side-by-side columns |
| [Updates](https://gitbook.com/docs/creating-content/blocks/updates) | Changelog/timeline |
| [Code blocks](https://gitbook.com/docs/creating-content/blocks/code-block) | Code with title |
| [Embedded URLs](https://gitbook.com/docs/creating-content/blocks/embed-a-url) | YouTube, Vimeo, CodePen embeds |
| [Files](https://gitbook.com/docs/creating-content/blocks/insert-files) | Downloadable files |

### Rehype-based (HTML syntax)

| Block | Description |
|-------|-------------|
| Buttons | Styled link buttons (`<a class="button">`) |
| Icons | Font Awesome icons (`<i class="fa-*">`) |
| Cards | Navigation card grid (`<table data-view="cards">`) |
| Expressions | Variable display (`<code class="expression">`) |

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
