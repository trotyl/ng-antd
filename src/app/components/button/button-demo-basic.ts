import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'button-demo-basic',
  templateUrl: './button-demo-basic.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoBasic { }
