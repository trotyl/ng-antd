import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Buttons can be grouped by placing multiple `Button` components into a `Button.Group`.
 *
 * The `size` can be set to `large`, `small` or left unset resulting in a default size.
 *
 * @order 6
 * @title Button Group
 */
@Component({
  selector: 'button-demo-button-group',
  templateUrl: './button-demo-button-group.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoButtonGroup { }
