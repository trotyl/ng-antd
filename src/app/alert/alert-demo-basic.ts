import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'alert-demo-basic',
  templateUrl: './alert-demo-basic.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class AlertDemoBasic { }
