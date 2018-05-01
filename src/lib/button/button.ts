import { coerceBooleanProperty as boolify } from '@angular/cdk/coercion'
import { isDevMode, ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { HostManager } from '../host-manager/host-manager'
import { assertFalse } from '../util/debug'
import { getSizeToken } from '../util/size'
import { BUTTON_PREFIX } from './token'

@Component({
  selector: '[antBtn]',
  templateUrl: './button.html',
  providers: [ HostManager ],
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
    @Self() private host: HostManager,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertFalse(/*@__PURE__*/boolify(this.loading) && !!this.icon, `antBtn: cannot have both 'icon' and 'loading'`)
      /*@__PURE__*/assertFalse(/*@__PURE__*/boolify(this.iconOnly) && !this.icon, `antBtn: 'iconOnly' requires 'icon'`)
    }
    this.updateHostClasses()
  }

  ngOnInit(): void {
    this.host.staticClasses = [ this.prefix ]
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${this.prefix}-${this.color}`]: !!this.color,
      [`${this.prefix}-${getSizeToken(this.size)}`]: !!this.size,
      [`${this.prefix}-circle`]: !!this.shape,
      [`${this.prefix}-icon-only`]: !!this.shape || boolify(this.iconOnly),
      [`${this.prefix}-loading`]: boolify(this.loading),
      [`${this.prefix}-background-ghost`]: boolify(this.ghost),
    }
  }
}
