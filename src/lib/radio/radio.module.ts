import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RadioButton } from './radio-button'
import { RadioGroup } from './radio-group'

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
})
export class RadioModule { }
