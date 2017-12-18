import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { IconModule } from '../icon/icon.module'
import { Button } from './button'
import { ButtonGroup } from './button-group'

const TYPES = [
  Button,
  ButtonGroup,
]

export {
  Button,
  ButtonGroup,
}

@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule, IconModule ],
  exports: [ TYPES ],
})
export class ButtonModule { }
