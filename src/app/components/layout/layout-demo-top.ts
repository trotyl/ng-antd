import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * The most basic "header-content-footer" layout.
 *
 * Generally, the mainnav is placed at the top of the page, and includes the logo, the first level navigation, and the secondary menu (users, settings, notifications) from left to right in it.
 * We always put contents in a fixed size navigation (eg: `1200px`), the layout of the whole page is stable, it's not affected by viewing area.
 *
 * Top-bottom structure is conform with the top-bottom viewing habit, it's a classical navigation pattern of websites. This pattern demonstrates efficiency in the main workarea, while using some vertical space. And because the horizontal space of the navigation is limited, this pattern is not suitable for cases when the first level navigation contains many elements or links
 *
 * @order 1
 * @title Header-Content-Footer
 */
@Component({
  selector: 'layout-demo-top',
  templateUrl: './layout-demo-top.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDemoTop { }
