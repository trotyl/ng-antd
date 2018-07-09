import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Layout.Sider supports responsive layout.
 *
 * > Note: You can get a responsive layout by setting `breakpoint`, the Sider will collapse to the width of `collapsedWidth` when window width is below the `breakpoint`. And a special trigger will appear if the `collapsedWidth` is set to `0`.
 *
 * @order 5
 * @title Responsive
 */
@Component({
  selector: 'layout-demo-responsive',
  templateUrl: './layout-demo-responsive.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDemoResponsive { }
