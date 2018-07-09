import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * By using `push` and` pull` class you can easily change column order.
 *
 * @order 3
 * @title RespGrid sortonsive
 */
@Component({
  selector: 'grid-demo-sort',
  templateUrl: './grid-demo-sort.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDemoSort { }
