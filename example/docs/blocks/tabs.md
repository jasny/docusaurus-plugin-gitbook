# Tabs

Tab blocks allow you to organize content into switchable panels.

## Basic Example

{% tabs %}
{% tab title="JavaScript" %}
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('World');
```
{% endtab %}

{% tab title="Python" %}
```python
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```
{% endtab %}

{% tab title="Go" %}
```go
package main

import "fmt"

func greet(name string) {
    fmt.Printf("Hello, %s!\n", name)
}

func main() {
    greet("World")
}
```
{% endtab %}
{% endtabs %}

## Syntax

```markdown
{% tabs %}
{% tab title="Tab 1" %}
Content for tab 1
{% endtab %}

{% tab title="Tab 2" %}
Content for tab 2
{% endtab %}
{% endtabs %}
```

## Use Cases

- Showing code in multiple languages
- Platform-specific instructions (Windows, macOS, Linux)
- Different implementation approaches
- Version-specific documentation
