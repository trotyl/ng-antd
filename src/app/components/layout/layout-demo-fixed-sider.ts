import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * When dealing with long content, a fixed sider can provide a better user experience.
 *
 * @order 7
 * @title Fixed Sider
 */
@Component({
  selector: 'layout-demo-fixed-sider',
  templateUrl: './layout-demo-fixed-sider.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDemoFixedSider { }
