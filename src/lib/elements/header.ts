import { Directive } from '@angular/core'
import { Element } from './element'

@Directive({
  selector: 'header:not([antNoEffect])',
})
export class HeaderElement extends Element {
  tag = 'header'
}
