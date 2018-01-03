import { ChangeDetectionStrategy, Directive, Input } from '@angular/core'
import { NgClass } from '@angular/common'
import { exists, getSizeToken, StyledControl, TypedChanges } from 'ng-antd/core'

const prefix = 'ant-btn-group'

@Directive({
  selector: 'ant-btn-group',
  providers: [ NgClass ],
})
export class ButtonGroup extends StyledControl {
  @Input() size: 'large' | 'small' | 'default' = 'default'

  ngOnUpdate(changes: TypedChanges<this>, firstChange: boolean): void {
    this.hostClasses = {
      [`${prefix}`]: true,
      [`${prefix}-${getSizeToken(this.size)}`]: exists(this.size),
    }
  }
}
