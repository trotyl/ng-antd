# Binding Action

Prevent usage of one-time binding in inputs.

## Implementation Requirements

+ Must NOT provide input only used for default status;

## Example

```typescript
/* Supported */
@Component({
  template: `
    <ul antMenu [(ngModel)]="selectedMenuItem">
      <li antMenuItem key="item"></li>
      <li antSubMenu key="subMenu"></li>
    </ul>
  `
})
class MyComponent implements OnInit {
  @ViewChild(Menu) menu: Menu

  selectedMenuItem = 'item'

  ngOnInit() {
    this.menu.open('subMenu')
  }
}

/* Not Supported */
@Component({
  template: `
    <ul antMenu>
      <li antMenuItem key="item" antSelected></li>
      <li antSubMenu key="subMenu" antOpened></li>
    </ul>
  `
})
class MyComponent implements OnInit { }
```
