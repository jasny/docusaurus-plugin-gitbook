# Task 2.10: OpenAPI Block

Reference OpenAPI spec endpoints.

## Syntax

```markdown
{% openapi src="https://api.example.com/openapi.json" path="/users" method="get" %}
[https://api.example.com/openapi.json](https://api.example.com/openapi.json)
{% endopenapi %}
```

## Attributes

- `src`: URL to OpenAPI spec
- `path`: API endpoint path
- `method`: HTTP method

## Implementation Notes

This is complex and may require:
- Fetching OpenAPI spec at build time
- Parsing spec to extract endpoint details
- Rendering interactive API documentation

## Recommended Approach

Consider integration with existing Docusaurus OpenAPI plugins like `docusaurus-openapi-docs` rather than reimplementing.

For MVP, render as a styled link/reference to the API documentation.

## Files to Create

- `src/remark/transformers/openapi.ts`
- `src/theme/GitBookOpenAPI/index.tsx`
- `src/theme/GitBookOpenAPI/styles.module.css`

## Test Cases

- Basic OpenAPI reference
- Different methods (GET, POST, etc.)

## Notes

This task may be deferred or simplified for initial release.
