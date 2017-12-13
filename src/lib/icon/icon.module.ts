import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Icon } from './icon'

const TYPES = [
  Icon,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule ],
  exports: [ TYPES ],
})
export class IconModule { }
