import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * `Button` components can contain an `Icon`. This is done by setting the `icon` property or placing an `Icon` component within the `Button`
 *
 * If you want specific control over the positioning and placement of the `Icon`, then that should be done by placing the `Icon` component within the `Button` rather than using the `icon` property.
 *
 * @order 1
 * @title Icon
 */
@Component({
  selector: 'button-demo-icon',
  templateUrl: './button-demo-icon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoIcon { }
