# Columns

Column blocks create side-by-side layouts for content.

## Two Columns

{% columns %}
{% column %}
### Left Column

This content appears on the left side. Columns are great for:
- Comparing features
- Showing before/after
- Side-by-side code examples
{% endcolumn %}

{% column %}
### Right Column

This content appears on the right side. The columns stack on mobile for better responsiveness.
{% endcolumn %}
{% endcolumns %}

## Columns with Code

{% columns %}
{% column %}
### Input

```json
{
  "name": "John",
  "age": 30
}
```
{% endcolumn %}

{% column %}
### Output

```json
{
  "success": true,
  "data": {
    "name": "John",
    "age": 30
  }
}
```
{% endcolumn %}
{% endcolumns %}

## Syntax

```markdown
{% columns %}
{% column %}
Left column content
{% endcolumn %}

{% column %}
Right column content
{% endcolumn %}
{% endcolumns %}
```

## Use Cases

- Feature comparisons
- Before/after examples
- Input/output demonstrations
- Parallel information display
