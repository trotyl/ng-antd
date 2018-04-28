import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Slider } from './slider'

const TYPES = [
  Slider,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule ],
  exports: [ TYPES ],
})
export class SliderModule { }
