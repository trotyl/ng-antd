import { Component } from '@angular/core'

@Component({
  selector: 'button-demo-ghost',
  templateUrl: './button-demo-ghost.html',
  styleUrls: [`./button-demo-ghost.css`],
  host: { '[style.display]': `'block'` },
})
export class ButtonDemoGhost { }
