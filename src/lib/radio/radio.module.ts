import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RadioButton } from './radio-button'
import { RadioGroup } from './radio-group'
import { RADIO_BUTTON_PREFIX, RADIO_GROUP_PREFIX } from './token'

const TYPES = [
  RadioButton,
  RadioGroup,
]

export {
  RadioButton,
  RadioGroup,
}

@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule ],
  exports: [ TYPES ],
  providers: [
    { provide: RADIO_BUTTON_PREFIX, useValue: 'ant-radio-button' },
    { provide: RADIO_GROUP_PREFIX, useValue: 'ant-radio-group' },
  ],
})
export class RadioModule { }
