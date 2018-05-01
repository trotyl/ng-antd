import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'button-demo-ghost',
  templateUrl: './button-demo-ghost.html',
  styleUrls: [`./button-demo-ghost.css`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class ButtonDemoGhost { }
