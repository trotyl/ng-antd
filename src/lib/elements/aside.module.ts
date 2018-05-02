import { NgModule } from '@angular/core'
import { AsideElement } from './aside'
import { ElementModule } from './element.module'

@NgModule({
  declarations: [ AsideElement ],
  imports: [ ElementModule ],
  exports: [ AsideElement ],
})
export class AsideElementModule { }
