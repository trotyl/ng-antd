import { coerceBooleanProperty as boolify } from '@angular/cdk/coercion'
import { isDevMode, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { getSizeToken } from '../core/lang'
import { HostManager } from '../host-manager/host-manager'

const prefix = 'ant-btn'

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

  constructor(@Self() private host: HostManager) { }

  ngOnChanges(changes: SimpleChanges): void {
    /* istanbul ignore else */
    if (isDevMode()) this.checkNoConflicts()
    this.updateHostClasses()
  }

  ngOnInit(): void {
    this.host.staticClasses = [prefix]
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${prefix}-${this.color}`]: !!this.color,
      [`${prefix}-${getSizeToken(this.size)}`]: !!this.size,
      [`${prefix}-circle`]: !!this.shape,
      [`${prefix}-icon-only`]: !!this.shape || boolify(this.iconOnly),
      [`${prefix}-loading`]: boolify(this.loading),
      [`${prefix}-background-ghost`]: boolify(this.ghost),
    }
  }

  private checkNoConflicts(): void {
    if (boolify(this.loading) && this.icon) {
      throw new Error(`Antd: button with icon '${this.icon}' cannot have loading status`)
    }

    if (boolify(this.iconOnly) && !this.icon) {
      throw new Error(`Antd: button without an icon cannot be iconOnly`)
    }
  }
}
