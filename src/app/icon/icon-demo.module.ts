import { NgModule, Type } from '@angular/core'
import { IconDemos } from './icon-demos'

const TYPES: Type<any>[] = [

]

const NG_MODULES: Type<any>[] = [

]

@NgModule({
  declarations: [ TYPES, IconDemos ],
  imports: [ NG_MODULES ],
  exports: [ TYPES ],
})
export class IconDemoModule { }
