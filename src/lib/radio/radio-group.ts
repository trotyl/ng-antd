import { forwardRef, Directive } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { noop, OnChangeFn, OnTouchedFn } from '../utils/lang'

@Directive({
  selector: 'ant-radio-group',
  host: {
    '[class.ant-radio-group]': `true`,
  },
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => RadioGroup) },
  ],
})
export class RadioGroup<T> implements ControlValueAccessor {
  value: T | null = null

  private onChangeFn: OnChangeFn<T> = noop
  private onTouchedFn: OnTouchedFn = noop

  writeValue(value: T | null): void {
    this.value = value
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChangeFn = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn
  }

  setDisabledState(disabled: boolean): void {
    throw new Error('Method not implemented')
  }

  update(value: T | null): void {
    this.value = value
    this.onChangeFn(value)
    this.onTouchedFn()
  }
}
