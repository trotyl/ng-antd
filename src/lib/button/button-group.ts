import { ChangeDetectionStrategy, Directive, Input } from '@angular/core'
import { NgClass } from '@angular/common'
import { exists, TypedChanges } from '../core/lang'
import { StyledControl } from '../core/control'

const prefix = 'ant-btn-group'

@Directive({
  selector: 'ant-btn-group',
  providers: [ NgClass ],
})
export class ButtonGroup extends StyledControl {
  @Input() size: 'large' | 'small' | 'default' = 'default'

  private _sizeClassMap: { [name: string]: string } = {
    large: 'lg',
    small: 'sm',
  }

  ngOnUpdate(changes: TypedChanges<this>, firstChange: boolean): void {
    this.hostClasses = {
      [`${prefix}`]: true,
      [`${prefix}-${this._sizeClassMap[this.size] || 'nosize'}`]: exists(this.size),
    }
  }
}
