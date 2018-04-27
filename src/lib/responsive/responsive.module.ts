import { NgModule } from '@angular/core'
import { LayoutModule } from '@angular/cdk/layout'
import { Responsive } from './responsive'

@NgModule({
  imports: [ LayoutModule ],
  providers: [ Responsive ],
})
export class ResponsiveModule { }
