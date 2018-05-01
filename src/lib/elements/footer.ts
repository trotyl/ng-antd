import { Directive, Injector } from '@angular/core'
import { Element } from './element'

@Directive({
  selector: 'footer',
})
export class FooterElement implements Element {
  constructor(public injector: Injector) { }
}
