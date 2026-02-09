# Implementation Plan

This directory contains the implementation plan for docusaurus-plugin-gitbook.

## Architecture Overview

The plugin will consist of:
1. **Remark plugin** - Transforms GitBook `{% tag %}` syntax in the Markdown AST (MDAST)
2. **Rehype plugin** - Transforms HTML-based GitBook syntax (cards, buttons, icons, expressions)
3. **React components** - Render the transformed blocks in Docusaurus
4. **CSS/Theme** - Styling for GitBook components

The transformation pipeline: `Markdown → MDAST (remark) → HAST (rehype) → JSX`

## How to Use This Plan

Tasks are organized as markdown files in three directories:

| Directory | Purpose |
|-----------|---------|
| `todo/` | Tasks not yet started |
| `progress/` | Tasks currently being worked on |
| `done/` | Completed tasks |

### File Naming

Files are named with a numeric prefix to maintain order:
- `1XX` = Phase 1 (Foundation)
- `2XX` = Phase 2 (Remark-based blocks)
- `3XX` = Phase 3 (Rehype-based blocks)
- `4XX` = Phase 4 (Polish & Integration)

Example: `101-gitbook_tag_parser.md` is Task 1.1

### Workflow

1. **Starting a task**: Move the file from `todo/` to `progress/`
2. **Completing a task**: Move the file from `progress/` to `done/`
3. **Blocking/pausing**: Add notes to the file and move back to `todo/` if needed

### Task File Structure

Each task file contains:
- Description and requirements
- Input/output specifications
- Files to create
- Test cases

## Implementation Order

Recommended order (see individual tasks for details):

**Foundation first:**
1. 101 → 102 → 104 → 105 (Parser, Remark, Components, Entry point)

**First block to validate architecture:**
2. 201 (Hint block)

**Core blocks:**
3. 202 → 203 → 204 → 206 (Tabs, Stepper, Columns, Code)

**Additional blocks:**
4. 205 → 207 → 208 (Updates, Embed, File)

**HTML-based blocks:**
5. 103 → 302 → 303 → 301 → 304 (Rehype, Button, Icon, Cards, Expression)

**Complex/deferrable:**
6. 209 → 210 (Include, OpenAPI)

**Polish:**
7. 401 → 402 → 403 → 404 (Theme, Docs, Testing, Example)
