import { isDevMode, ChangeDetectionStrategy, Component, HostListener, Input, OnInit, Optional } from '@angular/core'
import { RadioGroup } from './radio-group'

@Component({
  selector: 'ant-radio-btn, [antRadioBtn]',
  templateUrl: './radio-button.html',
  host: {
    '[class.ant-radio-button-wrapper]': `true`,
    '[class.ant-radio-button-wrapper-checked]': `checked`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class RadioButton<T> implements OnInit {
  @Input() value: T | null = null

  get checked(): boolean {
    return this.value === this.group.value
  }

  constructor(@Optional() private group: RadioGroup<T>) { }

  @HostListener('click')
  onClick(): void {
    this.group.update(this.value)
  }

  ngOnInit(): void {
    if (isDevMode()) this.checkNoConflits()
  }

  private checkNoConflits(): void {
    if (!this.group) {
      throw new Error(`Antd: radio button can only be used inside a radio group`)
    }
  }
}
