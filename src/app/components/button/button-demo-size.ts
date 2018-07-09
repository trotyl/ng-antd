import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'button-demo-size',
  templateUrl: './button-demo-size.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoSize {
  size = 'large'
}
