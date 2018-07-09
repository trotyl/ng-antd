import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * From the stack to the horizontal arrangement.
 *
 * You can create a basic grid system by using a single set of `Row` and `Col` grid assembly, all of the columns (Col) must be placed in `Row`.
 *
 * @order 0
 * @title Basic Grid
 */
@Component({
  selector: 'grid-demo-basic',
  templateUrl: './grid-demo-basic.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDemoBasic { }
