import { NgModule, Type } from '@angular/core'
import { LayoutModule } from '../lib-proxy'
import { LayoutDemoBasic } from './layout-demo-basic'

const TYPES: Type<any>[] = [
  LayoutDemoBasic,
]

const NG_MODULES: Type<any>[] = [
  LayoutModule,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ NG_MODULES ],
  exports: [ NG_MODULES, TYPES ],
})
export class LayoutDemoModule { }
