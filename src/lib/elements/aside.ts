import { Directive, Injector } from '@angular/core'
import { Element } from './element'

@Directive({
  selector: 'aside',
})
export class AsideElement implements Element {
  constructor(public injector: Injector) { }
}
