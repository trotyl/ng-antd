import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Ant Design supports a default button size as well as a large and small size.
 *
 * If a large or small button is desired, set the `size` property to either `large` or `small` respectively. Omit the `size` property for a button with the default size.
 *
 * @order 2
 * @title Size
 */
@Component({
  selector: 'button-demo-size',
  templateUrl: './button-demo-size.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoSize {
  size = 'large' as const
}
