# Unified Directive

Unify usage of components and non-component directive in public API.

## Implementation Requirements

+ Must NOT use type suffix in type class name;
+ Must NOT use kebab-case in attribute selector;

## Example

```html
<!-- Supported -->
<button antBtn type="primary">Primary</button>

<!-- Not Supported -->
<button ant-btn type="primary">Primary</button>
```

```typescript
/* Supported */
import { Button, ButtonGroup } from 'ng-antd'

/* Not Supported */
import { ButtonComponent, ButtonGroupDirective } from 'ng-antd'
```