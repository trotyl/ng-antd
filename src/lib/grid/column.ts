import { Directive, Input, OnChanges, Self, SimpleChanges } from '@angular/core'
import { NgClass, NgStyle } from '@angular/common'
import { HostElement } from '../core/host-element'
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
  selector: 'ant-col, [antCol]',
  providers: [ NgClass, NgStyle, HostElement ],
})
export class Column implements OnChanges {
  @Input() span: number = 0
  @Input() offset: number = 0
  @Input() order: number = 0
  @Input() pull: number = 0
  @Input() push: number = 0

  @Input()
  set antCol(value: number | '') {
    if (value !== '') { this.span = value }
  }

  constructor(
    private row: Row,
    @Self() private host: HostElement,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
    this.updateHostStyles()
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${prefix}`]: true,
      [`${prefix}-${this.span}`]: true,
      [`${prefix}-offset-${this.offset}`]: this.offset > 0,
      [`${prefix}-pull-${this.pull}`]: this.pull > 0,
      [`${prefix}-push-${this.push}`]: this.push > 0,
    }
  }

  private updateHostStyles(): void {
    const padding = this.row.gutter / 2
    this.host.styles = {
      'padding-left': `${padding}px`,
      'padding-right': `${padding}px`,
    }
  }
}
