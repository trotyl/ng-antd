import { Directive, Input } from '@angular/core'
import { Menu } from '../menu/menu'

@Directive({
  selector: '[antIcon]'
})
export class Icon {
  @Input() type: string
}
