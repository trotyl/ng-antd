import { Directive, Input } from '@angular/core'
import { NgClass } from '@angular/common'
import { boolify, exists, TypedChanges } from '../core/lang'
import { StyledControl } from '../core/control'

const prefix = 'ant-row'

@Directive({
  selector: 'ant-row',
  providers: [ NgClass ],
})
export class Row extends StyledControl {
  @Input() align: 'top' | 'middle' | 'bottom' = 'top'
  //TODO: add support for gutter
  @Input() gutter: number | { xs: number, sm: number, md: number } = 0
  @Input() justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between' = 'start'
  @Input() type: 'flex' | 'default' = 'default'

  ngOnUpdate(changes: TypedChanges<this>, firstChange: boolean): void {
    if (changes.gutter) {
      console.warn(`The 'gutter' property was not yet supported!`)
    }

    this.hostClasses = {
      [`${prefix}`]: true,
    }
  }
}
