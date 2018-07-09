import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Fixed Header is generally used to fix the top navigation to facilitate page switching.
 *
 * @order 6
 * @title Fixed Header
 */
@Component({
  selector: 'layout-demo-fixed',
  templateUrl: './layout-demo-fixed.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDemoFixed { }
