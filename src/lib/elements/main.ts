import { Directive, Injector } from '@angular/core'
import { Element } from './element'

@Directive({
  selector: 'main',
})
export class MainElement implements Element {
  constructor(public injector: Injector) { }
}
