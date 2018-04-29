import { Directive, Injector, NgModule } from '@angular/core'
import { Element } from './element'

@Directive({
  selector: 'header',
})
export class HeaderElement implements Element {
  constructor(public injector: Injector) { }
}

@NgModule({
  declarations: [ HeaderElement ],
  exports: [ HeaderElement ],
})
export class HeaderElementModule { }
