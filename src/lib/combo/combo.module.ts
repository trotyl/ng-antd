import { OverlayModule } from '@angular/cdk/overlay'
import { NgModule } from '@angular/core'
import { ComboFactory } from './combo'

@NgModule({
  imports: [ OverlayModule ],
  providers: [ ComboFactory ],
})
export class ComboModule { }
