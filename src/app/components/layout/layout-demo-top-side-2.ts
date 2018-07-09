import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Both the top navigation and the sidebar, commonly used in application site.
 *
 * @order 2
 * @title Header Sider 2
 */
@Component({
  selector: 'layout-demo-top-side-2',
  templateUrl: './layout-demo-top-side-2.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDemoTopSide2 { }
