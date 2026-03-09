---
sidebar_position: 1
---

# Cover

Page covers are rendered automatically from the `cover` frontmatter field that GitBook adds when you set a cover image on a page.

## Single image

```markdown
---
cover: .gitbook/assets/banner.png
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
  dark: .gitbook/assets/banner-dark.png
  light: .gitbook/assets/banner-light.png
---

# My Page
```

The correct image is shown automatically based on the user's selected color scheme.

## Asset files

The plugin automatically copies `.gitbook/assets` to your Docusaurus build output so that image paths like `.gitbook/assets/banner.png` resolve correctly without any extra configuration.

The plugin searches for the assets directory in the following locations relative to your `siteDir`:

- `../.gitbook/assets`
- `../docs/.gitbook/assets`
- `.gitbook/assets`
- `docs/.gitbook/assets`
