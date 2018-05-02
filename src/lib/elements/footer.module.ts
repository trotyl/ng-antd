import { NgModule } from '@angular/core'
import { ElementModule } from './element.module'
import { FooterElement } from './footer'

@NgModule({
  declarations: [ FooterElement ],
  imports: [ ElementModule ],
  exports: [ FooterElement ],
})
export class FooterElementModule { }
