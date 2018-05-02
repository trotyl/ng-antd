import { NgModule } from '@angular/core'
import { ElementModule } from './element.module'
import { MainElement } from './main'

@NgModule({
  declarations: [ MainElement ],
  imports: [ ElementModule ],
  exports: [ MainElement ],
})
export class MainElementModule { }
