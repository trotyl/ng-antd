import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'layout-demo-top',
  templateUrl: './layout-demo-top.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDemoTop { }
