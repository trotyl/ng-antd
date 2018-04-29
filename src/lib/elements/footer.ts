import { Directive, Injector, NgModule } from '@angular/core'
import { Element } from './element'

@Directive({
  selector: 'footer',
})
export class FooterElement implements Element {
  constructor(public injector: Injector) { }
}

@NgModule({
  declarations: [ FooterElement ],
  exports: [ FooterElement ],
})
export class FooterElementModule { }
