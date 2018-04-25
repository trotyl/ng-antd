import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
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

  @Input()
  set loading(value: boolean) { this._loading = boolify(value) }
  get loading(): boolean { return this._loading }

  @Input()
  set ghost(value: boolean) { this._ghost = boolify(value) }
  get ghost(): boolean { return this._ghost }

  @Input()
  set iconOnly(value: boolean) { this._iconOnly = boolify(value) }
  get iconOnly(): boolean { return this._iconOnly }

  @Input()
  set antBtn(value: 'primary' | 'dashed' | 'danger' | '' | null) {
    if (value !== '') { this.color = value }
  }

  private _hasContent = true
  private _loading = false
  private _ghost = false
  private _iconOnly = false

  constructor(@Self() private host: HostElement) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkNoConflicts()
    this.updateHostClasses()
  }

  ngOnInit(): void {
    if (!this.host.classes) {
      this.checkNoConflicts()
      this.updateHostClasses()
    }
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${prefix}`]: true,
      [`${prefix}-${this.color}`]: !!this.color,
      [`${prefix}-${getSizeToken(this.size)}`]: !!this.size,
      [`${prefix}-circle`]: !!this.shape,
      [`${prefix}-icon-only`]: !!this.shape || this._iconOnly,
      [`${prefix}-loading`]: this._loading,
      [`${prefix}-background-ghost`]: this._ghost,
    }
  }

  private checkNoConflicts(): void {
    if (this._loading && this.icon) {
      throw new Error(`Button with icon cannot have loading status`)
    }

    if (this._iconOnly && !this.icon) {
      throw new Error(`Button without an icon cannot be iconOnly`)
    }
  }
}
