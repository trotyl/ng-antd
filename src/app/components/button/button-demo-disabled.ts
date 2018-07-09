import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'button-demo-disabled',
  templateUrl: './button-demo-disabled.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoDisabled { }
