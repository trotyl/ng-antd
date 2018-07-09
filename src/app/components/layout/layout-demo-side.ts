import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Two-columns layout. The sider menu can be collapsed when horizontal space is limited.
 *
 * Generally, the mainnav is placed on the left side of the page, and the secondary menu is placed on the top of the working area. Contents will adapt the layout to the viewing area to improve the horizontal space usage, while the layout of the whole page is not stable.
 *
 * The level of the aisde navigation is scalable. The first, second, and third level navigations could be present more fluently and relevantly, and aside navigation can be fixed, allowing the user to quickly switch and spot the current position, improving the user experience. However, this navigation occupies some horizontal space of the contents
 *
 * @order 3
 * @title Sider
 */
@Component({
  selector: 'layout-demo-side',
  templateUrl: './layout-demo-side.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDemoSide { }
