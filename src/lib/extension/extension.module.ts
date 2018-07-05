import { OverlayModule } from '@angular/cdk/overlay'
import { NgModule } from '@angular/core'
import { Combo } from './combo'
import { Governor } from './governor'
import { Hover } from './hover'

const TYPES = [
  Hover,
  Combo,
  Governor,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ OverlayModule ],
  exports: [ TYPES ],
})
export class ExtensionModule { }
