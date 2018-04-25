import { isDevMode, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { NgClass } from '@angular/common'
import { coerceBooleanProperty as boolify } from '@angular/cdk/coercion'
import { getSizeToken } from '../core/lang'
import { HostElement } from '../core/host-element'

const prefix = 'ant-btn'

@Component({
  selector: 'button[antBtn]',
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ NgClass, HostElement ],
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

  constructor(@Self() private host: HostElement) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (isDevMode()) this.checkNoConflicts()
    this.updateHostClasses()
  }

  ngOnInit(): void {
    if (!this.host.classes) {
      if (isDevMode()) this.checkNoConflicts()
      this.updateHostClasses()
    }
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${prefix}`]: true,
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
      throw new Error(`Button with icon cannot have loading status`)
    }

    if (boolify(this.iconOnly) && !this.icon) {
      throw new Error(`Button without an icon cannot be iconOnly`)
    }
  }
}
