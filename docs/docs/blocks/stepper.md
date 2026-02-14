# Stepper

Stepper blocks display sequential steps with numbered indicators and connecting lines.

## Basic Example

{% stepper %}
{% step %}
## Install Dependencies

First, install the required dependencies using npm or yarn:

```bash
npm install docusaurus-plugin-gitbook
```
{% endstep %}

{% step %}
## Configure the Plugin

Add the plugin to your `docusaurus.config.js`:

```javascript
export default {
  plugins: ['docusaurus-plugin-gitbook'],
};
```
{% endstep %}

{% step %}
## Start Using GitBook Syntax

You can now use GitBook syntax in your markdown files:

```markdown
{% hint style="info" %}
Your content here
{% endhint %}
```
{% endstep %}

{% step %}
## Build and Deploy

Build your site and deploy!

```bash
npm run build
npm run serve
```
{% endstep %}
{% endstepper %}

## Syntax

```markdown
{% stepper %}
{% step %}
## Step Title
Step content here.
{% endstep %}

{% step %}
## Another Step
More content here.
{% endstep %}
{% endstepper %}
```

## Use Cases

- Installation guides
- Tutorials
- Onboarding flows
- Process documentation
