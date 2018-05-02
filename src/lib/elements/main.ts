import { Directive } from '@angular/core'
import { Element } from './element'
import { ElementContainer, NoopElementContainer } from './token'

@Directive({
  selector: 'main:not([antNoEffect])',
  providers: [
    { provide: ElementContainer, useExisting: NoopElementContainer },
  ],
})
export class MainElement extends Element {
  tag = 'main'
}
