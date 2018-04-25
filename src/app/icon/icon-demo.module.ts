import { NgModule, Type } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { IconDemos } from './icon-demos'

const TYPES: Type<any>[] = [

]

const NG_MODULES: Type<any>[] = [

]

@NgModule({
  declarations: [ TYPES, IconDemos ],
  imports: [ SharedModule, NG_MODULES ],
  exports: [ TYPES ],
})
export class IconDemoModule { }
