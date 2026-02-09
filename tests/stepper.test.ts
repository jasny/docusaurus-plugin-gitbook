import { describe, it, expect } from 'vitest';
import { remarkParsed, astToString } from './helpers.js';

describe('stepper block', () => {
  it('creates GitBookStepper and GitBookStep elements', () => {
    const tree = remarkParsed(`{% stepper %}
{% step %}
## Step 1
First step.
{% endstep %}
{% step %}
## Step 2
Second step.
{% endstep %}
{% endstepper %}`);
    const str = astToString(tree);

    expect(str).toContain('GitBookStepper');
    expect(str).toContain('GitBookStep');
  });

  it('parses headings inside steps', () => {
    const tree = remarkParsed(`{% stepper %}
{% step %}
## Step Title
Step paragraph.
{% endstep %}
{% endstepper %}`);
    const str = astToString(tree);

    expect(str).toContain('GitBookStep');
    expect(str).toContain('"type":"heading"');
    expect(str).toContain('Step Title');
  });

  it('parses code blocks inside steps', () => {
    const tree = remarkParsed(`{% stepper %}
{% step %}
## Install

\`\`\`bash
npm install foo
\`\`\`
{% endstep %}
{% endstepper %}`);
    const str = astToString(tree);

    expect(str).toContain('GitBookStep');
    expect(str).toContain('"type":"code"');
    expect(str).toContain('npm install foo');
  });

  it('parses inline code inside steps', () => {
    const tree = remarkParsed(`{% stepper %}
{% step %}
Add it to your \`docusaurus.config.js\` file.
{% endstep %}
{% endstepper %}`);
    const str = astToString(tree);

    expect(str).toContain('GitBookStep');
    expect(str).toContain('"type":"inlineCode"');
    expect(str).toContain('docusaurus.config.js');
  });

  it('preserves content after the stepper', () => {
    const tree = remarkParsed(`{% stepper %}
{% step %}
Step content.
{% endstep %}
{% endstepper %}

## After Stepper

Paragraph after stepper.`);
    const str = astToString(tree);

    expect(str).toContain('GitBookStepper');
    expect(str).toContain('After Stepper');
    expect(str).toContain('Paragraph after stepper.');
  });
});
