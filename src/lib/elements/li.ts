import { Directive, Injector } from '@angular/core'
import { Element } from './element'

@Directive({
  selector: 'li',
})
export class LiElement implements Element {
  constructor(public injector: Injector) { }
}
