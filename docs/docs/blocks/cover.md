---
sidebar_position: 1
---

# Cover

Page covers are rendered automatically from the `cover` frontmatter field that GitBook adds when you set a cover image on a page.

## Single image

```markdown
---
cover: /assets/banner.png
coverY: 0
---

# My Page
```

The cover image is displayed at the top of the page above the page title.

## Dark and light mode variants

GitBook supports separate images for dark and light mode:

```markdown
---
cover:
  dark: /assets/banner-dark.png
  light: /assets/banner-light.png
---

# My Page
```

The correct image is shown automatically based on the user's selected color scheme.

## Asset files

The plugin copies `.gitbook/assets` to `/assets` in your Docusaurus build output.
Any `.gitbook/assets/...` reference is rewritten to `/assets/...` automatically.
If a GitBook asset would overwrite an existing file in `static/assets`, the build fails with a conflict error.

The plugin searches for the assets directory in the following locations relative to your `siteDir`:

- `../.gitbook/assets`
- `../docs/.gitbook/assets`
- `.gitbook/assets`
- `docs/.gitbook/assets`
