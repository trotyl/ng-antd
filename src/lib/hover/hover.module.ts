import { NgModule } from '@angular/core'
import { Hover, HoverFactory } from './hover'

const TYPES = [
  Hover,
]

@NgModule({
  declarations: [ TYPES ],
  providers: [ HoverFactory ],
  exports: [ TYPES ],
})
export class HoverModule { }
