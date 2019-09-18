import { forwardRef, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { Control } from '../util/control'
import { range } from '../util/lang'

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class Slider extends Control<number> implements OnChanges, OnInit {
  /**
   * The minimum value the slider can slide to
   */
  @Input() min: number = 0

  /**
   * The maximum value the slider can slide to
   */
  @Input() max: number = 100

  /**
   * Tick mark of Slider, key must be in closed interval [min, max]
   */
  @Input() marks: { [key: number]: string | number } | null = null

  percentage: number
  stepItems: number[]
  range: number
  markWidth: number
  markMarginLeft: number
  markItems: {label: string, value: number}[]

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['min'] || changes['max']) {
      this.processStepsChange()
      this.processValueChange()
    }
    if (changes['marks']) {
      this.processMarksChange()
    }
  }

  ngOnInit(): void {
    if (!this.stepItems) {
      this.processStepsChange()
      this.processValueChange()
    }
  }

  handleUpdate(): void {
    if (this.value != null) {
      this.processValueChange()
    }
  }

  handleDisabled(): void {
    throw new Error('Method not implemented.')
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
    this.percentage = this.value! / this.range * 100
  }
}
