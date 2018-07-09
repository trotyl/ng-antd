import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Horizontal top navigation menu.
 *
 * @order 0
 * @title Top Navigation
 */
@Component({
  selector: 'menu-demo-horizontal',
  templateUrl: './menu-demo-horizontal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuDemoHorizontal {
  selected = 'mail'
}
