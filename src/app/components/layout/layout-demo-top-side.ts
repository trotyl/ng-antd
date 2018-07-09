import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Both the top navigation and the sidebar, commonly used in documentation site.
 *
 * @order 2
 * @title Header-Sider
 */
@Component({
  selector: 'layout-demo-top-side',
  templateUrl: './layout-demo-top-side.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDemoTopSide { }
