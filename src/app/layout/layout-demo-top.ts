import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'layout-demo-top',
  templateUrl: './layout-demo-top.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class LayoutDemoTop {
  selected = '2'
}
