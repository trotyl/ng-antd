import { coerceBooleanProperty as boolify } from '@angular/cdk/coercion'
import { isDevMode, ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit, Optional, Self, SimpleChanges } from '@angular/core'
import { Governor } from '../extension/governor'
import { assertFalse } from '../util/debug'
import { getSizeToken } from '../util/size'
import { BUTTON_PREFIX } from './token'

@Component({
  selector: '[antBtn]',
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class Button implements OnChanges, OnInit {
  @Input() color: 'primary' | 'dashed' | 'danger' | null = null
  @Input() size: 'large' | 'small' | null = null
  @Input() icon: string | null = null
  @Input() shape: 'circle' | null = null
  @Input() loading: boolean = false
  @Input() ghost: boolean = false
  @Input() iconOnly: boolean = false

  @Input()
  set antBtn(value: 'primary' | 'dashed' | 'danger' | '' | null) {
    if (value !== '') { this.color = value }
  }

  constructor(
    @Inject(BUTTON_PREFIX) private prefix: string,
    @Optional() @Self() private governor: Governor,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertFalse(/*@__PURE__*/boolify(this.loading) && !!this.icon, `antBtn: unexpected 'loading' input with 'icon' set`)
      /*@__PURE__*/assertFalse(/*@__PURE__*/boolify(this.iconOnly) && !this.icon, `antBtn: expected 'iconOnly' input without 'icon' set`)
    }
    this.updateHostClasses()
  }

  ngOnInit(): void {
    this.governor.configureStaticClasses([ this.prefix ])
  }

  private updateHostClasses(): void {
    this.governor.configureClasses({
      [`${this.prefix}-${this.color}`]: !!this.color,
      [`${this.prefix}-${getSizeToken(this.size, 'antBtn')}`]: !!this.size,
      [`${this.prefix}-circle`]: !!this.shape,
      [`${this.prefix}-icon-only`]: !!this.shape || boolify(this.iconOnly),
      [`${this.prefix}-loading`]: boolify(this.loading),
      [`${this.prefix}-background-ghost`]: boolify(this.ghost),
    })
  }
}
