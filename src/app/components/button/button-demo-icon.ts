import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'button-demo-icon',
  templateUrl: './button-demo-icon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoIcon { }
