import { Component } from '@angular/core'

@Component({
  selector: 'button-demo-basic',
  templateUrl: './button-demo-basic.html',
  host: { '[style.display]': `'block'` },
})
export class ButtonDemoBasic { }
