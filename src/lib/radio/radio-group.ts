import { Directive, EventEmitter, Input, Output } from '@angular/core'

@Directive({
  selector: 'ant-radio-group',
  host: {
    '[class.ant-radio-group]': `true`,
  },
})
export class RadioGroup<T> {
  @Input() value: T | null = null
  @Output() valueChange = new EventEmitter<T>()

  update(value: T): void {
    if (this.value !== value) {
      this.value = value
      this.valueChange.emit(value)
    }
  }
}
