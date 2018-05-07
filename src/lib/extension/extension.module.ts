import { OverlayModule } from '@angular/cdk/overlay'
import { NgModule } from '@angular/core'
import { Combo, ComboFactory } from './combo'
import { Governor, GovernorFactory } from './governor'
import { Hover, HoverFactory } from './hover'

const TYPES = [
  Hover,
  Combo,
  Governor,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ OverlayModule ],
  exports: [ TYPES ],
  providers: [ HoverFactory, ComboFactory, GovernorFactory ],
})
export class ExtensionModule { }
