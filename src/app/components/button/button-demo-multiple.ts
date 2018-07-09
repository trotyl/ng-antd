import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * If you need several buttons, we recommend that you use 1 primary button + n secondary buttons, and if there are more than three operations, you can group some of them into `Dropdown.Button`.
 *
 * @order 5
 * @title Multiple Buttons
 */
@Component({
  selector: 'button-demo-multiple',
  templateUrl: './button-demo-multiple.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoMultiple { }
