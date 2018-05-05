import { Directive } from '@angular/core'
import { Element } from './element'

@Directive({
  selector: 'aside:not([antNoEffect])',
})
export class AsideElement extends Element {
  tag = 'aside'
}
