import { Component, HostBinding, Input } from '@angular/core'

@Component({
  selector: 'ant-sider',
  templateUrl: './sider.html',
  host: {
    '[class.ant-layout-sider]': 'true'
  }
})
export class Sider {
  @Input() @HostBinding('style.width.px') width: number = 200
}
