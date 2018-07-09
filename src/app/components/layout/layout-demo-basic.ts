import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Classic page layouts.
 *
 * @order 0
 * @title Basic Structure
 */
@Component({
  selector: 'layout-demo-basic',
  templateUrl: './layout-demo-basic.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDemoBasic { }
