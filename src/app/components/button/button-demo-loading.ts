import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'button-demo-loading',
  templateUrl: './button-demo-loading.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoLoading {
  loading = false
  iconLoading = false
}
