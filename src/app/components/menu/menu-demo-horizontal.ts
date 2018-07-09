import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'menu-demo-horizontal',
  templateUrl: './menu-demo-horizontal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MenuDemoHorizontal {
  selected = 'mail'
}
