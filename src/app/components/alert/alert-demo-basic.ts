import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * The simplest usage for short messages.
 *
 * @order 0
 * @title Type
 */
@Component({
  selector: 'alert-demo-basic',
  templateUrl: './alert-demo-basic.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDemoBasic { }
