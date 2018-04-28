import { NgClass, NgStyle } from '@angular/common'
import { Directive, NgModule, Self } from '@angular/core'
import { HostElement } from '../core/host-element'

@Directive({
  selector: 'aside',
  providers: [ NgClass, NgStyle, HostElement ],
})
export class AsideElement {
  constructor(@Self() public host: HostElement) { }
}

@NgModule({
  declarations: [ AsideElement ],
  exports: [ AsideElement ],
})
export class AsideElementModule { }
