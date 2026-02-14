---
sidebar_position: 2
---

# Getting Started

This guide walks you through setting up a Docusaurus site that builds from your GitBook-synced repository.

## Prerequisites

- [Node.js](https://nodejs.org/) version 18 or above
- A GitHub repository with GitBook content (via [Git Sync](https://docs.gitbook.com/product-tour/git-sync))

## 1. Create a Docusaurus site

If you don't already have a Docusaurus site, create one:

```bash
npx create-docusaurus@latest my-docs classic
cd my-docs
```

See the [Docusaurus documentation](https://docusaurus.io/docs/installation) for more details.

## 2. Install the plugin

```bash
npm install docusaurus-plugin-gitbook
```

## 3. Configure Docusaurus

Update your `docusaurus.config.js`:

```javascript
import { remarkGitBook, rehypeGitBook } from 'docusaurus-plugin-gitbook';

export default {
  // ... your existing config

  // Use 'md' format since GitBook content is standard Markdown, not MDX
  markdown: {
    format: 'md',
  },

  // Load Font Awesome for GitBook icon support
  stylesheets: [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  ],

  // Register the plugin (provides theme components and CSS)
  plugins: ['docusaurus-plugin-gitbook'],

  presets: [
    [
      'classic',
      {
        docs: {
          // Add the remark and rehype plugins to transform GitBook syntax
          beforeDefaultRemarkPlugins: [remarkGitBook],
          rehypePlugins: [rehypeGitBook],
        },
      },
    ],
  ],
};
```

### Why `markdown.format: 'md'`?

GitBook writes standard Markdown, not MDX. Setting `format: 'md'` prevents Docusaurus from trying to parse GitBook's `{% tag %}` syntax as JSX expressions, which would cause build errors.

### What each piece does

- **`plugins: ['docusaurus-plugin-gitbook']`** — Registers the theme components (hints, tabs, etc.) and injects the GitBook CSS.
- **`beforeDefaultRemarkPlugins: [remarkGitBook]`** — Transforms `{% tag %}` blocks in Markdown into React components during the build.
- **`rehypePlugins: [rehypeGitBook]`** — Transforms HTML-based blocks (buttons, cards) in the HTML AST.

## 4. Set up GitBook Git Sync

If you haven't already configured Git Sync in GitBook:

1. Open your GitBook space
2. Go to the space menu and click **Synchronize with Git**
3. Select **GitHub** as the provider
4. Authenticate and select your repository
5. Choose a branch (e.g., `main`) and the directory for your content
6. Enable the sync — GitBook will push your content as Markdown files

Your repository will now contain `.md` files that Docusaurus can build.

## 5. Point Docusaurus to your content

Make sure Docusaurus knows where to find the docs. If GitBook syncs to a `docs/` folder in your repo, configure the docs path:

```javascript
docs: {
  path: 'docs',
  beforeDefaultRemarkPlugins: [remarkGitBook],
  rehypePlugins: [rehypeGitBook],
},
```

If GitBook syncs to the root of the repo, set `path: '.'`.

## 6. Build and preview

```bash
npm run build    # Build the static site
npm run serve    # Preview the build locally
```

Or for development with hot reload:

```bash
npm start
```

## 7. Deploy to GitHub Pages

Create `.github/workflows/docs.yml` in your repository:

```yaml
name: Deploy docs

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci
      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

This builds your site on every push to `main` and deploys it to GitHub Pages.

To enable GitHub Pages for your repository, go to **Settings > Pages** and set the source to **GitHub Actions**.
