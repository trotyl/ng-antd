import { Directive, Input } from '@angular/core'
import { Menu } from '../menu/index'

@Directive({
  selector: '[antDropdown]'
})
export class Dropdown {
  @Input() overlay: Menu
}
