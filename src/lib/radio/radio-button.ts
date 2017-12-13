import { Component, Input } from '@angular/core'

@Component({
  selector: 'ant-radio-btn',
  templateUrl: './radio-button.html'
})
export class RadioButton {
  @Input() value: string
}
