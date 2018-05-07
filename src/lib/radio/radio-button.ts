import { isDevMode, ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, HostListener, Inject, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core'
import { Governor } from '../extension/governor'
import { ControlItem } from '../util/control'
import { assertExist } from '../util/debug'
import { RadioGroup } from './radio-group'
import { RADIO_BUTTON_PREFIX } from './token'

@Component({
  selector: 'ant-radio-btn, [antRadioBtn]',
  templateUrl: './radio-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class RadioButton<T> extends ControlItem implements OnDestroy, OnInit {
  @Input() value: T | null = null

  get checked(): boolean {
    return this.value === this.group.value
  }

  constructor(
    private cdRef: ChangeDetectorRef,
    @Inject(RADIO_BUTTON_PREFIX) private prefix: string,
    @Optional() @Self() private governor: Governor,
    @Optional() @Host() private group: RadioGroup<T>,
  ) { super() }

  @HostListener('click')
  onClick(): void {
    this.group.updateByAction(this.value)
  }

  ngOnInit(): void {
    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertExist(this.group, `antRadioBtn: must under 'antRadioGroup'`)
    }

    this.governor.configureStaticClasses([ `${this.prefix}-wrapper` ])

    this.status$$ = this.group.status$.subscribe(() => {
      this.updateHostClasses()
      this.cdRef.markForCheck()
    })
  }

  ngOnDestroy(): void {
    if (this.status$$) this.status$$.unsubscribe()
  }

  private updateHostClasses(): void {
    this.governor.configureClasses({
      [`${this.prefix}-wrapper-checked`]: this.checked,
    })
  }
}
