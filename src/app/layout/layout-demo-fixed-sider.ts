import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'layout-demo-fixed-sider',
  templateUrl: './layout-demo-fixed-sider.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class LayoutDemoFixedSider { }
