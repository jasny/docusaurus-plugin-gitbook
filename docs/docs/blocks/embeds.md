# Embeds

Embed blocks allow you to embed external content like YouTube videos, CodePen, and more.

## YouTube Video

{% embed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" %}

## CodePen - Pen Settings

{% embed url="https://codepen.io/team/codepen/pen/PNaGbb" %}

## Syntax

```markdown
{% embed url="https://www.youtube.com/watch?v=VIDEO_ID" %}
```

## Supported Platforms

The embed component automatically detects and properly embeds content from:

- **YouTube** - Video embeds
- **CodePen** - Code demos
- **Loom** - Video recordings
- **Vimeo** - Video embeds
- **Generic URLs** - Displayed as iframe with link

## Notes

- The embed will maintain a 16:9 aspect ratio
- A direct link to the URL is provided below the embed
- External embeds require the URL to be accessible
