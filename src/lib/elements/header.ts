import { Directive, Injector } from '@angular/core'
import { Element } from './element'

@Directive({
  selector: 'header',
})
export class HeaderElement implements Element {
  constructor(public injector: Injector) { }
}
