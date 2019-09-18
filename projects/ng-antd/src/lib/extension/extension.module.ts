import { OverlayModule } from '@angular/cdk/overlay'
import { NgModule } from '@angular/core'
import { Expansion } from './expansion'
import { Governor } from './governor'
import { Hover } from './hover'

const TYPES = [
  Hover,
  Expansion,
  Governor,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ OverlayModule ],
  exports: [ TYPES ],
})
export class ExtensionModule { }
