import { Component } from '@angular/core'

@Component({
  selector: 'button-demo-size',
  templateUrl: './button-demo-size.html',
  host: { '[style.display]': `'block'` },
  preserveWhitespaces: false,
})
export class ButtonDemoSize {
  size = 'large'
}
