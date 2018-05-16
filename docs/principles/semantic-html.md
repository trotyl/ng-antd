# Semantic HTML

Prefer semantic HTML elements.

## Implementation Requirements

+ Must support attribute selector;
+ Must NOT support element selector for elements other than `<div>`, `<span>`, `<label>` or `<i>`;

## Demo Requirements

+ Prefer element selector if element is `<div>` or `<span>`;
+ Prefer native-element-only if no additional behavior other than `class` and `style` required;

## Example

```html
<!-- Supports Only -->
<button antBtn type="primary">Primary</button>

<!-- Preferred -->
<ant-btn-group size="large">
  <button antBtn type="primary">Backward</button>
  <button antBtn type="primary">Forward</button>
</ant-btn-group>

<!-- Not Recommended -->
<div antBtnGroup size="large">
  <button antBtn type="primary">Backward</button>
  <button antBtn type="primary">Forward</button>
</div>


<!-- Preferred -->
<i antIcon type="search"></i>

<!-- Not Recommended -->
<ant-icon type="search"></ant-icon>


<!-- Preferred -->
<ant-row>
  <ant-col span="12">col-12</ant-col>
  <ant-col span="12">col-12</ant-col>
</ant-row>

<!-- Not Recommended -->
<div antRow>
  <div antCol span="12">col-12</div>
  <div antCol span="12">col-12</div>
</div>


<!-- Preferred -->
<ant-layout>
  <header>Header</header>
  <ant-layout>
    <aside>Sider</aside>
    <main>Content</main>
  </ant-layout>
  <footer>Footer</footer>
</ant-layout>

<!-- Preferred -->
<ant-layout>
  <header>Header</header>
  <ant-layout>
    <ant-layout-sider collapsible>Sider</ant-layout-sider>
    <main>Content</main>
  </ant-layout>
  <footer>Footer</footer>
</ant-layout>

<!-- Not Recommended -->
<ant-layout>
  <ant-layout-header>Header</ant-layout-header>
  <ant-layout>
    <ant-layout-sider>Sider</ant-layout-sider>
    <ant-layout-content>Content</ant-layout-content>
  </ant-layout>
  <ant-layout-footer>Footer</ant-layout-footer>
</ant-layout>

<!-- Not Recommended -->
<div antLayout>
  <div antLayoutHeader>Header</div>
  <div antLayout>
    <div antLayoutSider>Sider</div>
    <div antLayoutContent>Content</div>
  </div>
  <div antLayoutFooter>Footer</div>
</div>

<!-- Preferred -->
<ant-affix>
  <button type="primary">Affix top</button>
</ant-affix>

<!-- Not Recommended -->
<div antAffix>
  <button type="primary">Affix top</button>
</div>
```
