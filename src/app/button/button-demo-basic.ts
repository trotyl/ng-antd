import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'button-demo-basic',
  templateUrl: './button-demo-basic.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class ButtonDemoBasic { }
