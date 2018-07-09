import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Use `row-flex` define `flex` layout, its child elements depending on the value of the `start`,` center`, `end`,` space-between`, `space-around`, which are defined in its parent node layout mode.
 *
 * @order 4
 * @title Flex Layout
 */
@Component({
  selector: 'grid-demo-flex',
  templateUrl: './grid-demo-flex.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDemoFlex { }
