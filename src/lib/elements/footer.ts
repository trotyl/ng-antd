import { Directive } from '@angular/core'
import { Element } from './element'
import { ElementContainer, NoopElementContainer } from './token'

@Directive({
  selector: 'footer',
  providers: [
    { provide: ElementContainer, useExisting: NoopElementContainer },
  ],
})
export class FooterElement extends Element {
  tag = 'footer'
}
