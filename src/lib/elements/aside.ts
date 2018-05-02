import { Directive } from '@angular/core'
import { Element } from './element'
import { ElementContainer, NoopElementContainer } from './token'

@Directive({
  selector: 'aside:not([antNoEffect])',
  providers: [
    { provide: ElementContainer, useExisting: NoopElementContainer },
  ],
})
export class AsideElement extends Element {
  tag = 'aside'
}
