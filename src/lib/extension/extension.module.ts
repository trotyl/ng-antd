import { OverlayModule } from '@angular/cdk/overlay'
import { NgModule } from '@angular/core'
import { GovernorModule } from '../governor/governor.module'
import { Combo, ComboFactory } from './combo'
import { Hover, HoverFactory } from './hover'

const TYPES = [
  Hover,
  Combo,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ OverlayModule, GovernorModule ],
  exports: [ TYPES, GovernorModule ],
  providers: [ HoverFactory, ComboFactory ],
})
export class ExtensionModule { }
