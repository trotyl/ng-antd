import { Directive } from '@angular/core'

@Directive({
  selector: 'ant-content, [antContent]',
  host: {
    '[class.ant-layout-content]': 'true',
  },
})
export class Content { }
