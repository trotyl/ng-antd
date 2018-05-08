import { NgModule, Type } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { GridModule, IconModule, MenuModule } from 'ng-antd'
import { SharedModule } from '../shared'
import { MenuDemoHorizontal } from './menu-demo-horizontal'
import { MenuDemoInline } from './menu-demo-inline'
import { MenuDemos } from './menu-demos'

const TYPES: Type<any>[] = [
  MenuDemoHorizontal,
  MenuDemoInline,
]

const NG_MODULES: Type<any>[] = [
  GridModule,
  IconModule,
  MenuModule,
]

@NgModule({
  declarations: [ TYPES, MenuDemos ],
  imports: [ FormsModule, SharedModule, NG_MODULES ],
  exports: [ TYPES ],
})
export class MenuDemoModule { }
