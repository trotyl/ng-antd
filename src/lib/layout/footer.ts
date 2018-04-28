import { Directive } from '@angular/core'

@Directive({
  selector: 'ant-footer, [antFooter]',
  host: {
    '[class.ant-layout-footer]': 'true',
  },
})
export class Footer { }
