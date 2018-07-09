import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'layout-demo-basic',
  templateUrl: './layout-demo-basic.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDemoBasic { }
