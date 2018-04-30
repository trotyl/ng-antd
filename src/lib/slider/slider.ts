import { forwardRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { noop, range, OnChangeFn, OnTouchedFn } from '../utils/lang'

@Component({
  selector: 'ant-slider, [antSlider]',
  templateUrl: './slider.html',
  host: {
    '[class.ant-slider]': `true`,
    '[class.ant-slider-with-marks]': `marks`,
    '[style.display]': `'block'`,
  },
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => Slider) },
  ],
  preserveWhitespaces: false,
})
export class Slider implements ControlValueAccessor, OnChanges, OnInit {
  @Input() min: number = 0
  @Input() max: number = 100
  @Input() marks: { [key: number]: string } | null = null

  value: number
  percentage: number
  stepItems: number[]
  range: number
  markWidth: number
  markMarginLeft: number
  markItems: {label: string, value: number}[]

  private onChangeFn: OnChangeFn<number> = noop
  private onTouchedFn: OnTouchedFn = noop

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['min'] || changes['max']) {
      this.processStepsChange()
    }
    if (changes['marks']) {
      this.processMarksChange()
    }
  }

  ngOnInit(): void {
    if (!this.stepItems) {
      this.processStepsChange()
    }
  }

  writeValue(value: number | null): void {
    if (value != null) {
      this.value = value
      this.processValueChange()
    }
  }

  registerOnChange(fn: OnChangeFn<number>): void {
    this.onChangeFn = fn
  }

  registerOnTouched(fn: OnTouchedFn): void {
    this.onTouchedFn = fn
  }

  setDisabledState(isDisabled: boolean): void {
    throw new Error('Method not implemented.')
  }

  update(value: number): void {
    this.value = value
    this.processValueChange()

    this.onChangeFn(this.value)
    this.onTouchedFn()
  }

  private processStepsChange(): void {
    this.stepItems = range(this.min, this.max)
  }

  private processMarksChange(): void {
    if (this.marks) {
      const length = Object.keys(this.marks).length
      const unit = 100 / (length - 1)
      this.markWidth = unit * 0.9
      this.markMarginLeft = this.markWidth / -2
    }
  }

  private processValueChange(): void {
    this.range = this.max - this.min
    this.percentage = this.value / this.range * 100
  }
}
