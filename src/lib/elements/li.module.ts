import { NgModule } from '@angular/core'
import { ElementModule } from './element.module'
import { LiElement } from './li'

@NgModule({
  declarations: [ LiElement ],
  imports: [ ElementModule ],
  exports: [ LiElement ],
})
export class LiElementModule { }
