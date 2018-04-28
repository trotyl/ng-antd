import { Directive } from '@angular/core'

@Directive({
  selector: '[demo]',
  host: {
    '[style.display]': `'block'`,
  },
})
export class Demo { }
