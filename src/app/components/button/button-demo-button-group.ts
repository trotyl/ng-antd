import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'button-demo-button-group',
  templateUrl: './button-demo-button-group.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class ButtonDemoButtonGroup { }
