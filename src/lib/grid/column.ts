import { ChangeDetectorRef, Directive, Input, Self } from '@angular/core'
import { NgClass, NgStyle } from '@angular/common'
import { boolify, exists, StyledControl, TypedChanges } from '../core/core.module'
import { Row } from './row'

const prefix = 'ant-col'

export interface ColumnOptions {
  span?: number
  offset?: number
  order?: number
  pull?: number
  push?: number
}

@Directive({
  selector: 'ant-col',
  providers: [ NgClass, NgStyle ],
})
export class Column extends StyledControl {
  @Input() span: number = 0
  @Input() offset: number = 0
  @Input() order: number = 0
  @Input() pull: number = 0
  @Input() push: number = 0
  @Input() xs: number | ColumnOptions | undefined = undefined
  @Input() sm: number | ColumnOptions | undefined = undefined
  @Input() md: number | ColumnOptions | undefined = undefined
  @Input() lg: number | ColumnOptions | undefined = undefined
  @Input() xl: number | ColumnOptions | undefined = undefined
  @Input() xxl: number | ColumnOptions | undefined = undefined

  constructor(
    private row: Row,
    cdRef: ChangeDetectorRef,
    @Self() ngClass: NgClass,
    @Self() ngStyle: NgStyle,
  ) { super(cdRef, ngClass, ngStyle) }

  ngOnUpdate(changes: TypedChanges<this>, firstChange: boolean): void {
    this.hostClasses = {
      [`${prefix}`]: true,
      [`${prefix}-${this.span}`]: true,
      [`${prefix}-offset-${this.offset}`]: this.offset > 0,
      [`${prefix}-pull-${this.pull}`]: this.pull > 0,
      [`${prefix}-push-${this.push}`]: this.push > 0,
    }

    const padding = this.row.normalizedGutter / 2
    if (padding !== 0) {
      this.hostStyles = {
        'padding-left': `${padding}px`,
        'padding-right': `${padding}px`,
      }
    }
  }
}
