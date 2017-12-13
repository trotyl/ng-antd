import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Dropdown } from './dropdown'

const TYPES = [
  Dropdown,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule ],
  exports: [ TYPES ],
})
export class DropdownModule { }
