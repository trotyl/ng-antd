import { ChangeDetectionStrategy, Directive, Input } from '@angular/core'
import { NgClass } from '@angular/common'
import { exists, getSizeToken, TypedChanges } from '../core/index'
import { StyledControl } from '../core/control'

const prefix = 'ant-btn-group'

@Directive({
  selector: 'ant-btn-group, [antBtnGroup]',
  providers: [ NgClass ],
})
export class ButtonGroup extends StyledControl {
  @Input() size: 'large' | 'small' | 'default' = 'default'

  @Input()
  set antBtnGroup(value: 'large' | 'small' | 'default' | '' | undefined) {
    if (value) { this.size = value }
  }

  ngOnUpdate(changes: TypedChanges<this>, firstChange: boolean): void {
    this.hostClasses = {
      [`${prefix}`]: true,
      [`${prefix}-${getSizeToken(this.size)}`]: exists(this.size),
    }
  }
}
