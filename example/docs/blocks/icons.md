# Icons

Icons are rendered using Font Awesome classes. The plugin converts `<i>` elements with Font Awesome classes into `<FAIcon>` components.

## Examples

<i class="fa-brands fa-github"></i> GitHub

<i class="fa-solid fa-check"></i> Completed

<i class="fa-solid fa-star"></i> Star

<i class="fa-solid fa-heart"></i> Heart

<i class="fa-brands fa-react"></i> React

## Syntax

```html
<i class="fa-brands fa-github"></i>
<i class="fa-solid fa-check"></i>
<i class="fa-solid fa-star"></i>
```

## Setup

To use Font Awesome icons, add the Font Awesome CSS to your Docusaurus config:

```js
// docusaurus.config.js
module.exports = {
  stylesheets: [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  ],
};
```

Or install the npm package:

```bash
npm install @fortawesome/fontawesome-free
```

Then import the CSS in your `custom.css`:

```css
@import '@fortawesome/fontawesome-free/css/all.min.css';
```
