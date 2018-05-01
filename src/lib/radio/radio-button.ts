import { isDevMode, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core'
import { HostManager } from '../host-manager/host-manager'
import { ControlItem } from '../util/control'
import { assertExist } from '../util/debug'
import { RadioGroup } from './radio-group'

const prefix = 'ant-radio-button-wrapper'

@Component({
  selector: 'ant-radio-btn, [antRadioBtn]',
  templateUrl: './radio-button.html',
  providers: [ HostManager ],
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
    @Self() private host: HostManager,
    @Optional() private group: RadioGroup<T>,
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

    this.host.staticClasses = [ prefix ]

    this.status$$ = this.group.status$.subscribe(() => {
      this.updateHostClasses()
      this.cdRef.markForCheck()
    })
  }

  ngOnDestroy(): void {
    if (this.status$$) this.status$$.unsubscribe()
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${prefix}-checked`]: this.checked,
    }
  }
}
