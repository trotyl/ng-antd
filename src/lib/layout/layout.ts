import { Component, ContentChildren, QueryList } from '@angular/core'
import { Sider } from './sider'

@Component({
  selector: 'ant-layout, [antLayout]',
  templateUrl: './layout.html',
  host: {
    '[class.ant-layout]': 'true',
    '[class.ant-layout-has-sider]': 'this.siders.length > 0',
  }
})
export class Layout {
  @ContentChildren(Sider) siders: QueryList<Sider>
}
