import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'button-demo-multiple',
  templateUrl: './button-demo-multiple.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoMultiple { }
