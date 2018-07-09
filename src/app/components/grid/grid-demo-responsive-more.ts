import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * `span` `pull` `push` `offset` `order` property can be embedded into `xs` `sm` `md` `lg` `xl` properties to use,
 * where `xs = {6}` is equivalent to `xs = {{span: 6}}`.
 *
 * @order 8
 * @title More responsive
 */
@Component({
  selector: 'grid-demo-responsive-more',
  templateUrl: './grid-demo-responsive-more.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDemoResponsiveMore { }
