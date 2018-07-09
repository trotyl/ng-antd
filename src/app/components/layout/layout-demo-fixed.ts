import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'layout-demo-fixed',
  templateUrl: './layout-demo-fixed.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDemoFixed { }
