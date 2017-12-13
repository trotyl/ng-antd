import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { NgClass } from '@angular/common'
import { boolify, exists, Classes, TypedChanges } from '../core/lang'
import { StyledControl } from '../core/control'

const prefix = 'ant-btn'

@Component({
  selector: 'button[antBtn]',
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ NgClass ],
})
export class Button extends StyledControl {
  @Input() type: 'primary' | 'dashed' | 'danger' | 'default' = 'default'
  @Input() size: 'large' | 'small' | 'default' = 'default'
  @Input() icon: string | null = null
  @Input() shape: 'circle' | 'default' = 'default'

  @Input()
  set loading(value: boolean) { this._loading = boolify(value) }
  get loading(): boolean { return this._loading }

  @Input()
  set ghost(value: boolean) { this._ghost = boolify(value) }
  get ghost(): boolean { return this._ghost }

  @Input()
  set antBtn(value: 'primary' | 'dashed' | 'danger' | 'default' | '' | undefined) {
    if (value) { this.type = value }
  }

  private _loading = false
  private _ghost = false
  private _sizeClassMap: { [name: string]: string } = {
    large: 'lg',
    small: 'sm'
  }

  ngOnUpdate(changes: TypedChanges<this>, firstChange: boolean): void {
    const shaped = exists(this.shape)
    this.hostClasses = {
      [`${prefix}`]: true,
      [`${prefix}-${this.type}`]: exists(this.type),
      [`${prefix}-${this._sizeClassMap[this.size] || 'nosize'}`]: exists(this.size),
      [`${prefix}-circle`]: shaped,
      [`${prefix}-icon-only`]: shaped,
      [`${prefix}-loading`]: this._loading,
      [`${prefix}-background-ghost`]: this._ghost,
    }
  }
}
