import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core'

@Component({
  selector: 'ant-sider, [antSider]',
  templateUrl: './sider.html',
  host: {
    '[class.ant-layout-sider]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class Sider {
  @Input() @HostBinding('style.width.px') width: number = 200

  @Input()
  set antSider(value: number | '' | undefined) {
    if (value) { this.width = value }
  }
}
