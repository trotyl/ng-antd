import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ExtensionModule } from '../extension/extension.module'
import { IconModule } from '../icon/icon.module'
import { Button } from './button'
import { ButtonGroup } from './button-group'
import { BUTTON_GROUP_PREFIX, BUTTON_PREFIX } from './token'

const TYPES = [
  Button,
  ButtonGroup,
]

const NG_MODULES = [
  ExtensionModule,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [
    CommonModule,
    IconModule,
    NG_MODULES,
  ],
  exports: [ TYPES, NG_MODULES ],
  providers: [
    { provide: BUTTON_PREFIX, useValue: 'ant-btn' },
    { provide: BUTTON_GROUP_PREFIX, useValue: 'ant-btn-group' },
  ],
})
export class ButtonModule { }
