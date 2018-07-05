import { CommonModule } from '@angular/common'
import { NgModule, Type } from '@angular/core'
import { AlertModule, SliderModule } from 'ng-antd'
import { SharedModule } from '../shared'

import { AlertDemoBasic } from './alert-demo-basic'
import { AlertDemos } from './alert-demos'

const TYPES: Type<any>[] = [
  AlertDemoBasic,
]

const NG_MODULES: Type<any>[] = [
  CommonModule,
  AlertModule,
  SliderModule,
]

@NgModule({
  declarations: [ TYPES, AlertDemos ],
  imports: [ SharedModule, NG_MODULES ],
  exports: [ TYPES ],
})
export class AlertDemoModule { }
