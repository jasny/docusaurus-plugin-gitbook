# Code Blocks

Code blocks with titles allow you to label your code snippets with filenames or descriptions.

## Basic Example

{% code title="hello.js" %}
```javascript
function hello() {
  console.log('Hello, World!');
}

hello();
```
{% endcode %}

## With Line Numbers

{% code title="config.ts" lineNumbers %}
```typescript
interface Config {
  apiUrl: string;
  timeout: number;
  debug: boolean;
}

const config: Config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  debug: false,
};

export default config;
```
{% endcode %}

## Configuration Files

{% code title="docusaurus.config.js" %}
```javascript
export default {
  title: 'My Site',
  url: 'https://example.com',
  plugins: ['docusaurus-plugin-gitbook'],
};
```
{% endcode %}

## Syntax

```markdown
{% code title="filename.ext" %}
\`\`\`language
Your code here
\`\`\`
{% endcode %}
```

### Attributes

- `title` - The filename or title to display
- `lineNumbers` - Show line numbers (boolean)
- `overflow` - How to handle overflow: `wrap` or `scroll`
