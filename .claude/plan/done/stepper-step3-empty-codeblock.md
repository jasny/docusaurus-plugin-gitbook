# Step 3 code block is empty when it contains GitBook tag syntax

## Problem

On `/docs/blocks/stepper`, Step 3 "Start Using GitBook Syntax" has an empty code block. The code block should show:

````markdown
```markdown
{% hint style="info" %}
Your content here
{% endhint %}
```
````

Instead, it renders as an empty dark bar with no visible content.

## Root cause

The parser is interpreting `{% hint %}` and `{% endhint %}` tags inside the fenced code block as actual GitBook block tags, rather than treating them as literal text. Code fences should escape/protect their contents from GitBook tag parsing.

The tokenizer or parser needs to be aware of fenced code block boundaries and skip any `{% ... %}` tags that appear inside them.

## Files to investigate

- `src/parser/tokenizer.ts` — should skip tags inside fenced code blocks
- `src/remark/plugin.ts` — may need to check if a tag node is inside a code block before transforming it

## Screenshot

See `stepper-broken.png` in project root — Step 3 shows empty code block.
