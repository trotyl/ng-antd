import { Directive, Input } from '@angular/core'

@Directive({
  selector: '[antMenu]',
  exportAs: 'antMenu',
})
export class Menu {}
