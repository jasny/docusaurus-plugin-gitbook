---
slug: /
sidebar_position: 1
---

# Introduction

**Write your docs in GitBook's rich editor. Host them anywhere - on GitHub Pages, Netlify, Vercel, or your own domain.**

GitBook is a great editor for writing documentation, but hosting is limited to GitBook's own platform. If you want full control over your site - custom domains, your own CI/CD pipeline, no vendor lock-in - you need an alternative way to build and publish your content.

## How it works

GitBook stores your content as Markdown in a Git repository via [GitHub Sync](https://docs.gitbook.com/product-tour/git-sync). This plugin lets [Docusaurus](https://docusaurus.io/) understand GitBook's custom syntax, so you can build a static site from that same repo.

1. **Write** in GitBook's editor — rich blocks, tabs, hints, embeds, and more
2. **Sync** to GitHub automatically via GitBook's Git Sync feature
3. **Build** with Docusaurus + this plugin to produce a static site
4. **Deploy** anywhere — GitHub Pages, Netlify, Vercel, S3, or any static host

Your content stays in Markdown in your Git repo. No lock-in. If you ever want to switch away from GitBook, your content is already in a standard format.

## Supported blocks

This plugin handles GitBook-specific syntax that standard Markdown processors don't understand:

| Block | Description |
|-------|-------------|
| [Hints](/blocks/hints) | Info, warning, danger, and success callouts |
| [Tabs](/blocks/tabs) | Tabbed content panels |
| [Stepper](/blocks/stepper) | Numbered step-by-step guides |
| [Columns](/blocks/columns) | Side-by-side column layouts |
| [Code blocks](/blocks/code) | Code blocks with titles and line numbers |
| [Embeds](/blocks/embeds) | Embedded external content (YouTube, etc.) |
| [Files](/blocks/files) | File download links |
| [Buttons](/blocks/buttons) | Primary and secondary action buttons |
| [Cards](/blocks/cards) | Card grid layouts |
| [Icons](/blocks/icons) | Font Awesome icons |
| [OpenAPI](/blocks/openapi) | OpenAPI/Swagger endpoint documentation |
