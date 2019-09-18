import { NgModule, Type } from '@angular/core'
import { DocsSharedModule } from '../shared'
import { AlertDemoBasic } from './alert'
import { ButtonDemoBasic, ButtonDemoButtonGroup, ButtonDemoDisabled, ButtonDemoGhost, ButtonDemoIcon, ButtonDemoLoading, ButtonDemoMultiple, ButtonDemoSize } from './button'
import { GridDemoBasic, GridDemoFlex, GridDemoFlexAlign, GridDemoFlexOrder, GridDemoGutter, GridDemoOffset, GridDemoPlayground, GridDemoResponsive, GridDemoResponsiveMore, GridDemoSort } from './grid'
import { LayoutDemoBasic, LayoutDemoCustomTrigger, LayoutDemoFixed, LayoutDemoFixedSider, LayoutDemoResponsive, LayoutDemoSide, LayoutDemoTop, LayoutDemoTopSide, LayoutDemoTopSide2 } from './layout'
import { MenuDemoHorizontal, MenuDemoInline } from './menu'

const ALERT_DIRECTIVES = [
  AlertDemoBasic,
]

const BUTTON_DIRECTIVES = [
  ButtonDemoBasic,
  ButtonDemoButtonGroup,
  ButtonDemoDisabled,
  ButtonDemoGhost,
  ButtonDemoIcon,
  ButtonDemoLoading,
  ButtonDemoMultiple,
  ButtonDemoMultiple,
  ButtonDemoSize,
]

const GRID_DIRECTIVES = [
  GridDemoBasic,
  GridDemoFlex,
  GridDemoFlexAlign,
  GridDemoFlexOrder,
  GridDemoGutter,
  GridDemoOffset,
  GridDemoPlayground,
  GridDemoResponsive,
  GridDemoResponsiveMore,
  GridDemoSort,
]

const ICON_DIRECTIVES: [] = [

]

const LAYOUT_DIRECTIVES = [
  LayoutDemoBasic,
  LayoutDemoCustomTrigger,
  LayoutDemoFixed,
  LayoutDemoFixedSider,
  LayoutDemoResponsive,
  LayoutDemoSide,
  LayoutDemoTop,
  LayoutDemoTopSide,
  LayoutDemoTopSide2,
]

const MENU_DIRECTIVES = [
  MenuDemoHorizontal,
  MenuDemoInline,
]

const DIRECTIVES = [
  ALERT_DIRECTIVES,
  BUTTON_DIRECTIVES,
  GRID_DIRECTIVES,
  ICON_DIRECTIVES,
  LAYOUT_DIRECTIVES,
  MENU_DIRECTIVES,
]

export const group: { [name: string]: Type<any>[] } = {
  alert: ALERT_DIRECTIVES,
  button: BUTTON_DIRECTIVES,
  grid: GRID_DIRECTIVES,
  icon: ICON_DIRECTIVES,
  layout: LAYOUT_DIRECTIVES,
  menu: MENU_DIRECTIVES,
}

@NgModule({
  declarations: [ DIRECTIVES ],
  imports: [ DocsSharedModule ],
  exports: [ DIRECTIVES ],
  entryComponents: [ DIRECTIVES ],
})
export class DocsDemoModule { }
