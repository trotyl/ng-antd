import { NgModule } from '@angular/core'
import { ElementModule } from './element.module'
import { HeaderElement } from './header'

@NgModule({
  declarations: [ HeaderElement ],
  imports: [ ElementModule ],
  exports: [ HeaderElement ],
})
export class HeaderElementModule { }
