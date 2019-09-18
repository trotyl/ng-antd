import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ExtensionModule } from '../extension/extension.module'
import { FragmentModule } from '../fragment/fragment.module'
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
  ExtensionModule,
  FragmentModule,
]

/**
 * Menu list of Navigation.
 *
 * @whenToUse
 * Navigation menu is important for a website, it helps users jump from one site section to another quickly. Mostly, it includes top navigation and side navigation. Top navigation provides all the category and functions of the website. Side navigation provides the Multi-level structure of the website.
 *
 * More layouts with navigation: [layout](/components/layout).
 *
 * @cols 1
 */
@NgModule({
  declarations: [ TYPES ],
  imports: [
    CommonModule,
    NG_MODULES,
  ],
  exports: [ TYPES, NG_MODULES ],
  providers: [
    { provide: MENU_PREFIX, useValue: 'ant-menu' },
  ],
})
export class MenuModule { }
