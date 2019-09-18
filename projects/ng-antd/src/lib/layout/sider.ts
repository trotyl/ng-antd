import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core'

@Component({
  selector: 'ant-layout-sider, [antLayoutSider]',
  templateUrl: './sider.html',
  host: {
    '[class.ant-layout-sider]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class LayoutSider {
  /**
   * width of the sidebar
   */
  @Input() @HostBinding('style.width.px') width: number = 200

  @Input()
  set antLayoutSider(value: number | '' | undefined) {
    if (value) { this.width = value }
  }
}
