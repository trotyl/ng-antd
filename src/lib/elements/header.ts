import { Directive } from '@angular/core'
import { Element } from './element'
import { ElementContainer, NoopElementContainer } from './token'

@Directive({
  selector: 'header:not([antNoEffect])',
  providers: [
    { provide: ElementContainer, useExisting: NoopElementContainer },
  ],
})
export class HeaderElement extends Element {
  tag = 'header'
}
