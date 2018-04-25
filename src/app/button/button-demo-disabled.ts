import { Component } from '@angular/core'

@Component({
  selector: 'button-demo-disabled',
  templateUrl: './button-demo-disabled.html',
  host: { '[style.display]': `'block'` },
})
export class ButtonDemoDisabled { }
