# AGENTS.md

This file provides guidance to coding agents working with this repository.

## Project Overview

Docusaurus plugin for MDX that adds support for GitBook-specific blocks:
- Hint, Tabs, Stepper, Columns, Updates, Embeds, Files, Cards, Buttons, Icons
- Code blocks with titles
- Reusable content includes (TODO)
- Variables and expressions (TODO)

## Commands

```bash
yarn build        # Compile TypeScript to lib/
yarn watch        # Compile in watch mode
yarn test         # Run tests with vitest
yarn test:watch   # Run tests in watch mode
yarn lint         # Run ESLint
yarn lint:fix     # Run ESLint with auto-fix
yarn typecheck    # Type-check without emitting
```

## Architecture

```
src/
├── index.ts                 # Main plugin entry point
├── parser/                  # GitBook {% tag %} parser
│   ├── tokenizer.ts         # Tokenizes {% ... %} tags
│   ├── parser.ts            # Parses tokens into block tree
│   └── index.ts
├── remark/                  # Remark plugin (Markdown AST)
│   ├── plugin.ts            # Main remark plugin
│   ├── utils.ts             # MDAST utilities
│   └── transformers/        # Block transformers
│       ├── hint.ts
│       ├── tabs.ts
│       ├── stepper.ts
│       ├── columns.ts
│       ├── updates.ts
│       ├── code.ts
│       ├── embed.ts
│       ├── file.ts
│       └── all.ts           # Imports all transformers
├── rehype/                  # Rehype plugin (HTML AST)
│   ├── plugin.ts            # Main rehype plugin
│   └── transformers/        # HTML transformers
│       ├── button.ts
│       ├── icon.ts
│       ├── cards.ts
│       └── all.ts
└── theme/                   # React components
    ├── types.ts             # Shared TypeScript interfaces
    ├── index.ts             # Component exports
    ├── GitBookHint/
    ├── GitBookTabs/
    ├── GitBookTab/
    ├── GitBookStepper/
    ├── GitBookStep/
    ├── GitBookColumns/
    ├── GitBookColumn/
    ├── GitBookUpdates/
    ├── GitBookUpdate/
    ├── GitBookCodeBlock/
    ├── GitBookEmbed/
    ├── GitBookFile/
    ├── GitBookButton/
    ├── GitBookIcon/
    ├── GitBookCards/
    └── GitBookCard/
```

## Implementation Status

Track detailed task files in your planning area. Tasks should be organized in `todo/`, `progress/`, or `done/`.

**Completed:**
- Parser infrastructure (tokenizer, parser)
- Remark plugin with transformers for: hint, tabs, stepper, columns, updates, code, embed, file
- Rehype plugin with transformers for: button, icon, cards
- React components for all above blocks

**TODO:**
- Include block (file imports)
- Expression block (variables)
- OpenAPI block
- CSS theme consolidation
- Documentation
- Testing
- Example site

## GitBook Block Syntax Reference

See the repository's GitBook syntax reference documentation for comprehensive block syntax details.

### Remark-transformed blocks ({% tag %} syntax):
- `{% hint style="info|warning|danger|success" %}...{% endhint %}`
- `{% tabs %}{% tab title="X" %}...{% endtab %}{% endtabs %}`
- `{% stepper %}{% step %}...{% endstep %}{% endstepper %}`
- `{% columns %}{% column %}...{% endcolumn %}{% endcolumns %}`
- `{% updates %}{% update date="YYYY-MM-DD" %}...{% endupdate %}{% endupdates %}`
- `{% code title="filename" %}...{% endcode %}`
- `{% embed url="..." %}`
- `{% file src="..." %}description{% endfile %}`

### Rehype-transformed blocks (HTML syntax):
- `<a class="button primary|secondary" href="...">text</a>`
- `<i class="fa-iconname">text</i>`
- `<table data-view="cards">...</table>`
