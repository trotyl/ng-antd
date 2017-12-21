import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LayoutModule } from '@angular/cdk/layout'
import { ScreenManager, Breakpoint } from './screen-manager'

@NgModule({
  imports: [ CommonModule, LayoutModule ],
  exports: [ LayoutModule ],
  providers: [ ScreenManager ],
})
export class CoreModule { }
