import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'layout-demo-top-side',
  templateUrl: './layout-demo-top-side.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class LayoutDemoTopSide { }
