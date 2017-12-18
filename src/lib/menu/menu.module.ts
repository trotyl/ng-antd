import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Menu } from './menu'

const TYPES = [
  Menu,
]

export {
  Menu,
}

@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule ],
  exports: [ TYPES ],
})
export class MenuModule { }
