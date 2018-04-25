import { Component } from '@angular/core'

@Component({
  selector: 'button-demo-ghost',
  templateUrl: './button-demo-ghost.html',
  host: { '[style.display]': `'block'` },
})
export class ButtonDemoGhost { }
