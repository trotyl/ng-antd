import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * A loading indicator can be added to a button by setting the `loading` property on the `Button`.
 *
 * @order 4
 * @title Loading
 */
@Component({
  selector: 'button-demo-loading',
  templateUrl: './button-demo-loading.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoLoading {
  loading = false
  iconLoading = false
}
