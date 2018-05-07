import { OverlayModule } from '@angular/cdk/overlay'
import { NgModule } from '@angular/core'
import { Combo, ComboFactory } from '../combo/combo'
import { Hover, HoverFactory } from './hover'

const TYPES = [
  Hover,
  Combo,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ OverlayModule ],
  exports: [ TYPES ],
  providers: [ HoverFactory, ComboFactory ],
})
export class ExtensionModule { }
