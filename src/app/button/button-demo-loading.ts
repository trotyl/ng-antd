import { Component } from '@angular/core'

@Component({
  selector: 'button-demo-loading',
  templateUrl: './button-demo-loading.html',
  host: { '[style.display]': `'block'` },
})
export class ButtonDemoLoading {
  loading = false
  iconLoading = false
}
