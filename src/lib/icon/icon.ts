import { Directive, Input } from '@angular/core'
import { NgClass } from '@angular/common'
import { boolify, exists, TypedChanges } from '../core/index'
import { StyledControl } from '../core/control'

const prefix = 'anticon'

@Directive({
  selector: 'i[antIcon]',
  providers: [ NgClass ],
})
export class Icon extends StyledControl {
  @Input() type: string

  @Input()
  set spin(value: boolean) { this._spin = boolify(value) }
  get spin(): boolean { return this._spin }

  @Input()
  set antIcon(value: string | undefined) {
    if (value) { this.type = value }
  }

  private _spin = false

  ngOnUpdate(changes: TypedChanges<this>, firstChange: boolean): void {
    this.hostClasses = {
      [`${prefix}`]: true,
      [`${prefix}-${this.type}`]: exists(this.type),
      [`${prefix}-spin`]: this._spin || this.type === 'loading',
    }
  }
}
