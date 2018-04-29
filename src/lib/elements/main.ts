import { Directive, Injector, NgModule } from '@angular/core'
import { Element } from './element'

@Directive({
  selector: 'main',
})
export class MainElement implements Element {
  constructor(public injector: Injector) { }
}

@NgModule({
  declarations: [ MainElement ],
  exports: [ MainElement ],
})
export class MainElementModule { }
