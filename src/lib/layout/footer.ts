import { Directive } from '@angular/core'

@Directive({
  selector: 'ant-footer',
  host: {
    '[class.ant-layout-footer]': 'true'
  }
})
export class Footer { }
