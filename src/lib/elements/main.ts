import { Directive, NgModule, Self } from '@angular/core'
import { NgClass, NgStyle } from '@angular/common'
import { HostElement } from '../core/host-element'

@Directive({
  selector: 'main',
  providers: [ NgClass, NgStyle, HostElement ],
})
export class MainElement {
  constructor(@Self() public host: HostElement) { }
}

@NgModule({
  declarations: [ MainElement ],
  exports: [ MainElement ],
})
export class MainElementModule { }
