import { Directive, Injector, NgModule } from '@angular/core'
import { Element } from './element'

@Directive({
  selector: 'aside',
})
export class AsideElement implements Element {
  constructor(public injector: Injector) { }
}

@NgModule({
  declarations: [ AsideElement ],
  exports: [ AsideElement ],
})
export class AsideElementModule { }
