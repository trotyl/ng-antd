# Shortcus Property

Make full use of attribute selector.

## Implementation Requirements

+ Must make attribute selector as a delegate input to main property;

## Demo Requirements

+ Prefer shortcut input when possible;

## Example

```html
<!-- Preferred -->
<button antBtn="primary">Primary</button>

<!-- Not Recommended -->
<button antBtn type="primary">Primary</button>


<!-- Preferred -->
<i antIcon="search"></i>

<!-- Not Recommended -->
<i antIcon type="search"></i>
```
