import { Component } from '@angular/core'

@Component({
  selector: 'button-demo-size',
  templateUrl: './button-demo-size.html',
})
export class ButtonDemoSize {
  size = 'large'

  handleSizeChange(event: Event) {
    this.size = (event.target as HTMLInputElement).value
  }
}
