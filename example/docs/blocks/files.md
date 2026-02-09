# Files

File blocks create downloadable file attachments with descriptions.

## Basic File

{% file src="/downloads/guide.pdf" %}
Download the complete user guide.
{% endfile %}

## Multiple Files

{% file src="/downloads/report-2024.xlsx" %}
Annual report spreadsheet with all quarterly data.
{% endfile %}

{% file src="/downloads/assets.zip" %}
Download all brand assets including logos and icons.
{% endfile %}

## Syntax

```markdown
{% file src="/path/to/file.pdf" %}
Optional description of the file.
{% endfile %}
```

### Attributes

- `src` - The path or URL to the downloadable file

## Best Practices

- Use descriptive filenames
- Add helpful descriptions explaining what the file contains
- Organize files in a consistent directory structure
- Consider file sizes for user experience
