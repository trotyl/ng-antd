import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * There are `primary` button, `default` button, `dashed` button and `danger` button in antd.
 *
 * @order 0
 * @title Type
 */
@Component({
  selector: 'button-demo-basic',
  templateUrl: './button-demo-basic.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoBasic { }
