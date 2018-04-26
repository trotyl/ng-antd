import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { OverlayModule } from '@angular/cdk/overlay'
import { Dropdown } from './dropdown'
import { Overlay } from './overlay'

const TYPES = [
  Dropdown,
  Overlay,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule, OverlayModule ],
  exports: [ TYPES ],
})
export class DropdownModule { }
