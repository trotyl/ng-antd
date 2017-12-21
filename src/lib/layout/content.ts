import { Directive } from '@angular/core'

@Directive({
  selector: 'ant-content',
  host: {
    '[class.ant-layout-content]': 'true'
  }
})
export class Content { }
