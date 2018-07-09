import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'layout-demo-side',
  templateUrl: './layout-demo-side.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDemoSide { }
