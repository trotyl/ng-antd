import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Referring to the Bootstrap [responsive design] (http://getbootstrap.com/css/#grid-media-queries), here preset six dimensions: `xs` `sm` `md` `lg` `xl`.
 *
 * @order 7
 * @title Responsive
 */
@Component({
  selector: 'grid-demo-responsive',
  templateUrl: './grid-demo-responsive.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDemoResponsive { }
