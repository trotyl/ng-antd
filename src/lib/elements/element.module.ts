import { NgModule } from '@angular/core'
import { ElementContainer, NoopElementContainer } from './token'

@NgModule({
  providers: [
    { provide: ElementContainer, useClass: NoopElementContainer },
  ],
})
export class ElementModule { }
