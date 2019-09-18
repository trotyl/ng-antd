import { Directive } from '@angular/core'

@Directive({
  selector: 'ant-layout-header, [antLayoutHeader]',
  host: {
    '[class.ant-layout-header]': 'true',
  },
})
export class LayoutHeader { }
