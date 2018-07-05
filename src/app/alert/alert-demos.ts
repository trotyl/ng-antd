import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'alert-demos',
  templateUrl: './alert-demos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class AlertDemos { }
