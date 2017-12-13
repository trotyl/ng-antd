import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Button } from './button'
import { ButtonGroup } from './button-group'

const TYPES = [
  Button,
  ButtonGroup,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule ],
  exports: [ TYPES ],
})
export class ButtonModule { }
