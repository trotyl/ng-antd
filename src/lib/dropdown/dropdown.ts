import { Directive, Input } from '@angular/core'
import { Menu } from '../menu'

@Directive({
  selector: '[antDropdown]'
})
export class Dropdown {
  @Input() overlay: Menu
}
