import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * `Offset` can set the column to the right side. For example, using `offset = {4}` can set the element shifted to the right four columns width.
 *
 * @order 2
 * @title Column offset
 */
@Component({
  selector: 'grid-demo-offset',
  templateUrl: './grid-demo-offset.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDemoOffset { }
