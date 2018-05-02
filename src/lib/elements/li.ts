import { Directive } from '@angular/core'
import { Element } from './element'
import { ElementContainer, NoopElementContainer } from './token'

@Directive({
  selector: 'li:not([antNoEffect])',
  providers: [
    { provide: ElementContainer, useExisting: NoopElementContainer },
  ],
})
export class LiElement extends Element {
  tag = 'li'
}