import { OverlayModule } from '@angular/cdk/overlay'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Dropdown } from './dropdown'
import { Overlay } from './overlay'

const TYPES = [
  Dropdown,
  Overlay,
]

/**
 * A dropdown list.
 *
 * @whenToUse
 * If there are too many operations to display, you can wrap them in a `Dropdown`. By clicking/hovering on the trigger, a dropdown menu should appear, which allows you to choose one option and execute relevant actions.
 */
@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule, OverlayModule ],
  exports: [ TYPES ],
})
export class DropdownModule { }
