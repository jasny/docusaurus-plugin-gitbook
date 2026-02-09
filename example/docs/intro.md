# Introduction

Welcome to the GitBook Plugin Example site! This demonstrates all the GitBook-specific syntax that is supported by the `docusaurus-plugin-gitbook` plugin.

## Getting Started

To use this plugin in your own Docusaurus site:

1. Install the plugin:
   ```bash
   npm install docusaurus-plugin-gitbook
   ```

2. Add it to your `docusaurus.config.js`:
   ```javascript
   export default {
     plugins: ['docusaurus-plugin-gitbook'],
   };
   ```

3. Start using GitBook syntax in your markdown files!

## Supported Blocks

The plugin supports the following GitBook blocks:

| Block | Syntax |
|-------|--------|
| Hints | `{% hint %}...{% endhint %}` |
| Tabs | `{% tabs %}...{% endtabs %}` |
| Stepper | `{% stepper %}...{% endstepper %}` |
| Columns | `{% columns %}...{% endcolumns %}` |
| Code | `{% code %}...{% endcode %}` |
| Embed | `{% embed url="..." %}` |
| File | `{% file src="..." %}...{% endfile %}` |
| Buttons | `<a class="button">` |
| Cards | `<table data-view="cards">` |

Explore the documentation to see each block in action!
