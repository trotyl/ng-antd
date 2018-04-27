import { Directive, NgModule, Self } from '@angular/core'
import { NgClass, NgStyle } from '@angular/common'
import { HostElement } from '../core/host-element'

@Directive({
  selector: 'header',
  providers: [ NgClass, NgStyle, HostElement ],
})
export class HeaderElement {
  constructor(@Self() public host: HostElement) { }
}

@NgModule({
  declarations: [ HeaderElement ],
  exports: [ HeaderElement ],
})
export class HeaderElementModule { }
