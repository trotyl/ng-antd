import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Icon } from './icon'
import { ICON_PREFIX } from './token'

const TYPES = [
  Icon,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule ],
  exports: [ TYPES ],
  providers: [
    { provide: ICON_PREFIX, useValue: 'anticon' },
  ],
})
export class IconModule { }
