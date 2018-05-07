import { OverlayModule } from '@angular/cdk/overlay'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FragmentModule } from '../fragment/fragment.module'
import { HoverModule } from '../hover/hover.module'
import { MenuItemGroup } from './item-group'
import { MenuItemGroupContainer } from './item-group-container'
import { Menu } from './menu'
import { MenuItem } from './menu-item'
import { SubMenu } from './sub-menu'
import { MENU_PREFIX } from './token'

const TYPES = [
  MenuItemGroup,
  MenuItemGroupContainer,
  Menu,
  MenuItem,
  SubMenu,
]

const NG_MODULES = [
  FragmentModule,
  HoverModule,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [
    CommonModule,
    OverlayModule,
    NG_MODULES,
  ],
  exports: [ TYPES, NG_MODULES ],
  providers: [
    { provide: MENU_PREFIX, useValue: 'ant-menu' },
  ],
})
export class MenuModule { }
