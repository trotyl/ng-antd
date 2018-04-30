import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ItemGroup } from './item-group'
import { Menu } from './menu'
import { MenuItem } from './menu-item'
import { SubMenu } from './sub-menu'

const TYPES = [
  ItemGroup,
  Menu,
  MenuItem,
  SubMenu,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule ],
  exports: [ TYPES ],
})
export class MenuModule { }
