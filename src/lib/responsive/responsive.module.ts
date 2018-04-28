import { LayoutModule } from '@angular/cdk/layout'
import { NgModule } from '@angular/core'
import { Responsive } from './responsive'

@NgModule({
  imports: [ LayoutModule ],
  providers: [ Responsive ],
})
export class ResponsiveModule { }
