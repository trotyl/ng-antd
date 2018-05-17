import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ExtensionModule } from '../extension/extension.module'
import { Alert } from './alert'
import { ALERT_PREFIX } from './token'

const TYPES = [
  Alert,
]

const NG_MODULES = [
  ExtensionModule,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [
    CommonModule,
    NG_MODULES,
  ],
  exports: [ TYPES, NG_MODULES ],
  providers: [
    { provide: ALERT_PREFIX, useValue: 'ant-alert' },
  ],
})
export class AlertModule { }
