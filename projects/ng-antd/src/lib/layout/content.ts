import { Directive } from '@angular/core'

@Directive({
  selector: 'ant-layout-content, [antLayoutContent]',
  host: {
    '[class.ant-layout-content]': 'true',
  },
})
export class LayoutContent { }
