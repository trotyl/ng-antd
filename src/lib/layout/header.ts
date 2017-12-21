import { Directive } from '@angular/core'

@Directive({
  selector: 'ant-header',
  host: {
    '[class.ant-layout-header]': 'true'
  }
})
export class Header { }
