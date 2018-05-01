import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ItemGroup } from './item-group'
import { Menu } from './menu'
import { MenuItem } from './menu-item'
import { SubMenu } from './sub-menu'
import { MENU_PREFIX } from './token'

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
  providers: [
    { provide: MENU_PREFIX, useValue: 'ant-menu' },
  ],
})
export class MenuModule { }
