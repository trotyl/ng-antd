import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * To mark a button as disabled, add the `disabled` property to the `Button`.
 *
 * @order 3
 * @title Disabled
 */
@Component({
  selector: 'button-demo-disabled',
  templateUrl: './button-demo-disabled.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoDisabled { }
