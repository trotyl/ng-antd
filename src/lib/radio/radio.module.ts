import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ExtensionModule } from '../extension/extension.module'
import { RadioButton } from './radio-button'
import { RadioGroup } from './radio-group'
import { RADIO_BUTTON_PREFIX, RADIO_GROUP_PREFIX } from './token'

const TYPES = [
  RadioButton,
  RadioGroup,
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
    { provide: RADIO_BUTTON_PREFIX, useValue: 'ant-radio-button' },
    { provide: RADIO_GROUP_PREFIX, useValue: 'ant-radio-group' },
  ],
})
export class RadioModule { }
