import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * To change the element sort by Flex layout order.
 *
 * @order 6
 * @title Flex Order
 */
@Component({
  selector: 'grid-demo-flex-order',
  templateUrl: './grid-demo-flex-order.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDemoFlexOrder { }
