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

/**
 * Radio.
 *
 * @whenToUse
 * - Used to select a single state in multiple options.
 * - The difference between Select is that Radio is visible to user and can facilitate the comparison of choice, which makes there shouldn't be too many of them.
 */
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
