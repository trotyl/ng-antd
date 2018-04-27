import { Component, HostListener, Input } from '@angular/core'
import { RadioGroup } from './radio-group'

@Component({
  selector: 'ant-radio-btn, [antRadioBtn]',
  templateUrl: './radio-button.html',
  host: {
    '[class.ant-radio-button-wrapper]': `true`,
    '[class.ant-radio-button-wrapper-checked]': `checked`,
  },
})
export class RadioButton<T> {
  @Input() value: T

  get checked(): boolean {
    return this.value === this.group.value
  }

  constructor(private group: RadioGroup<T>) { }

  @HostListener('click')
  onClick(): void {
    this.group.update(this.value)
  }
}
