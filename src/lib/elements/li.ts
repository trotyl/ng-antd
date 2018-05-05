import { Directive } from '@angular/core'
import { Element } from './element'

@Directive({
  selector: 'li:not([antNoEffect])',
})
export class LiElement extends Element {
  tag = 'li'
}
