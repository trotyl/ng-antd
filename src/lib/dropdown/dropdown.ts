import { Directive, Input } from '@angular/core'
import { Menu } from '../menu/menu.module'

@Directive({
  selector: '[antDropdown]'
})
export class Dropdown {
  @Input() overlay: Menu
}
