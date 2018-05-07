import { Directive } from '@angular/core'
import { Element } from './element'

@Directive({
  selector: 'main:not([antNoEffect])',
})
export class MainElement extends Element {
  tag = 'main'
}
