import { NgModule, Type } from '@angular/core'
import { LayoutModule } from 'ng-antd'
import { SharedModule } from '../shared/shared.module'
import { LayoutDemoBasic } from './layout-demo-basic'
import { LayoutDemoTop } from './layout-demo-top'
import { LayoutDemoTopSide } from './layout-demo-top-side'
import { LayoutDemoTopSide2 } from './layout-demo-top-side-2'
import { LayoutDemoSide } from './layout-demo-side'
import { LayoutDemoCustomTrigger } from './layout-demo-custom-trigger'
import { LayoutDemoResponsive } from './layout-demo-responsive'
import { LayoutDemoFixed } from './layout-demo-fixed'
import { LayoutDemoFixedSider } from './layout-demo-fixed-sider'
import { LayoutDemos } from './layout-demos'

const TYPES: Type<any>[] = [
  LayoutDemoBasic,
  LayoutDemoTop,
  LayoutDemoTopSide,
  LayoutDemoTopSide2,
  LayoutDemoCustomTrigger,
  LayoutDemoSide,
  LayoutDemoResponsive,
  LayoutDemoFixed,
  LayoutDemoFixedSider,
]

const NG_MODULES: Type<any>[] = [
  LayoutModule,
]

@NgModule({
  declarations: [ TYPES, LayoutDemos ],
  imports: [ SharedModule, NG_MODULES ],
  exports: [ TYPES ],
})
export class LayoutDemoModule { }