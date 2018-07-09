import { NgModule } from '@angular/core'
import { AsideElementModule, FooterElementModule, HeaderElementModule, MainElementModule } from '../element/element.module'
import { ExtensionModule } from '../extension/extension.module'
import { LayoutContent } from './content'
import { LayoutFooter } from './footer'
import { LayoutHeader } from './header'
import { Layout } from './layout'
import { LayoutSider } from './sider'
import { LAYOUT_PREFIX } from './token'

const TYPES = [
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
  LayoutSider,
]

const NG_MODULES = [
  FooterElementModule,
  HeaderElementModule,
  MainElementModule,
  AsideElementModule,
  ExtensionModule,
]

/**
 * Handling the overall layout of a page.
 *
 * ## Specification
 *
 * ### Size
 *
 * The first level navigation is inclined left near a logo, and the secondary menu is inclined right.
 *
 * - Top Navigation (almost systems): the height of the first level navigation `64px`, the second level navigation `48px`.
 * - Top Navigation(contents page): the height of the first level navigation `80px`, the second level navigation `56px`.
 * - Calculation formula of a top navigation: `48+8n`.
 * - Calculation formula of an aside navigation: `200+8n`.
 *
 * ### Interaction rules
 *
 * - The first level navigation and the last level navigation should be distincted by visualization;
 * - The current item should have the highest priority of visualization;
 * - When the current navigation item is collapsed, the stlye of the current navigation item will be applied to its parent level;
 * - The left side navigation bar has support for both the accordion and expanding styles, you can choose the one that fits your case best.
 *
 * ## Visualization rules
 *
 *  Style of a navigation should conform to its level.
 *
 * - **Emphasis by colorblock**
 *
 *   When background color is a deep color, you can use this pattern for the parent level navigation item of current page.
 *
 * - **The highlight match stick**
 *
 *   When background color is a light color, you can use this pattern for the current page navigation item, we recommed using it for the last item of the navigation path.
 *
 * - **Hightlighted font**
 *
 *   From the visualization aspect, hightlighted font is stronger than colorblock, this pattern is often used for the parent level of the current item.
 *
 * - **Enlarge the size of the font**
 *
 *   `12px`、`14px` is a standard font size of navigations，`14px` is used for the first and the second level of the navigation. You can choose a appropriate font size in terms of the level of your navigation.
 *
 * ## Component Overview
 *
 * - `Layout`: The layout wrapper, in which `Header` `Sider` `Content` `Footer` or `Layout` itself can be nested, and can be placed in any parent container.
 * - `Header`: The top layout with default style, in which any element can be nested, and must be placed in `Layout`.
 * - `Sider`: The sidebar with default style and basic functions, in which any element can be nested, and must be placed in `Layout`.
 * - `Content`: The content layout with default style, in which any element can be nested, and must be placed in `Layout`.
 * - `Footer`: The bottom layout with default style, in which any element can be nested, and must be placed in `Layout`.
 *
 * > Based on `flex layout`, please pay attention to the [compatibility](http://caniuse.com/#search=flex).
 */
@NgModule({
  declarations: [ TYPES ],
  imports: [ NG_MODULES ],
  exports: [ TYPES, NG_MODULES ],
  providers: [
    { provide: LAYOUT_PREFIX, useValue: 'ant-layout' },
  ],
})
export class LayoutModule { }
