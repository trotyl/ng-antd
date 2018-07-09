import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Slider } from './slider'

const TYPES = [
  Slider,
]

/**
 * A Slider component for displaying current value and intervals in range.
 *
 * @whenToUse
 * To input a value in a range.
 */
@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule ],
  exports: [ TYPES ],
})
export class SliderModule { }
