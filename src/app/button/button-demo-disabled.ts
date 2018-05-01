import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'button-demo-disabled',
  templateUrl: './button-demo-disabled.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class ButtonDemoDisabled { }
