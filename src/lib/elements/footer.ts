import { Directive } from '@angular/core'
import { Element } from './element'

@Directive({
  selector: 'footer:not([antNoEffect])',
})
export class FooterElement extends Element {
  tag = 'footer'
}
