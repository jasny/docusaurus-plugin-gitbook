# OpenAPI

The `{% openapi %}` block renders inline API endpoint documentation by fetching an OpenAPI spec.

## List Pets

{% openapi src="https://petstore3.swagger.io/api/v3/openapi.json" path="/pet/findByStatus" method="get" %}
{% endopenapi %}

## Add a Pet

{% openapi src="https://petstore3.swagger.io/api/v3/openapi.json" path="/pet" method="post" %}
{% endopenapi %}

## Delete a Pet

{% openapi src="https://petstore3.swagger.io/api/v3/openapi.json" path="/pet/{petId}" method="delete" %}
{% endopenapi %}
