import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * You can use the `gutter` property of `Row` as grid spacing, we recommend set it to `(16 + 8n) px`. (`n` stands for natural number.)
 *
 * You can set it to a object like `{ xs: 8, sm: 16, md: 24, lg: 32 }` for responsive design.
 *
 * @order 1
 * @title Grid Gutter
 */
@Component({
  selector: 'grid-demo-gutter',
  templateUrl: './grid-demo-gutter.html',
  styleUrls: ['./grid-demo-gutter.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDemoGutter { }
