import { Directive } from '@angular/core'

@Directive({
  selector: 'ant-layout-footer, [antLayoutFooter]',
  host: {
    '[class.ant-layout-footer]': 'true',
  },
})
export class LayoutFooter { }
