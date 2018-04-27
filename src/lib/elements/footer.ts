import { Directive, NgModule, Self } from '@angular/core'
import { NgClass, NgStyle } from '@angular/common'
import { HostElement } from '../core/host-element'

@Directive({
  selector: 'footer',
  providers: [ NgClass, NgStyle, HostElement ],
})
export class FooterElement {
  constructor(@Self() public host: HostElement) { }
}

@NgModule({
  declarations: [ FooterElement ],
  exports: [ FooterElement ],
})
export class FooterElementModule { }
