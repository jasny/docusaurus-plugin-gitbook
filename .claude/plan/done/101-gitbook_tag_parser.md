# Task 1.1: GitBook Tag Parser

Create a parser utility that can identify and extract GitBook block syntax from markdown text.

## Input Syntax Patterns

- Opening tags: `{% tagname %}`, `{% tagname attr="value" %}`, `{% tagname attr="value" attr2="value2" %}`
- Closing tags: `{% endtagname %}`
- Self-closing style: `{% embed url="..." %}` (no end tag)

## Parser Requirements

- Extract tag name (e.g., `tabs`, `hint`, `step`)
- Extract attributes as key-value pairs (e.g., `{style: "info", title: "Note"}`)
- Handle quoted attribute values (both single and double quotes)
- Handle attributes without values (boolean attributes)
- Identify matching open/close tag pairs
- Support nested blocks (e.g., tabs containing hints)

## Output Interface

```typescript
interface GitBookTag {
  name: string;
  attributes: Record<string, string>;
  content: string; // raw content between open/close tags
  children?: GitBookTag[]; // for nested blocks
}
```

## Files to Create

- `src/parser/tokenizer.ts` - Tokenize `{% ... %}` tags
- `src/parser/parser.ts` - Parse tokens into structured blocks
- `src/parser/index.ts` - Export parser utilities

## Test Cases

- Simple tag: `{% hint style="info" %}content{% endhint %}`
- Nested tags: tabs containing hints
- Multiple attributes: `{% code title="example.js" lineNumbers="true" %}`
- Self-closing: `{% embed url="https://youtube.com/..." %}`
- Malformed/unclosed tags (error handling)
