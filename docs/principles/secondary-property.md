# Secondary Property

Prevent ambiguous input type by introduce secondary property.

## Implementation Requirements

+ Must NOT accept different types (except coercing) in single input property;

## Example

```html
<!-- Supported -->
<ant-row>
  <ant-col span="24">Col</ant-col>
  <ant-col span="24" span.md="6">Col</ant-col>
  <ant-col span="24" span.md="12">Col</ant-col>
  <ant-col span="24" span.md="6">Col</ant-col>
</ant-row>


<!-- Not Supported -->
<ant-row>
  <ant-col span="24">Col</ant-col>
  <ant-col [span]="{default: 24, md: 6}">Col</ant-col>
  <ant-col [span]="{default: 24, md: 12}">Col</ant-col>
  <ant-col [span]="{default: 24, md: 6}">Col</ant-col>
</ant-row>
```
