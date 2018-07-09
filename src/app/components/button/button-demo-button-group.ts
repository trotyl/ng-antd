import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'button-demo-button-group',
  templateUrl: './button-demo-button-group.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoButtonGroup { }
