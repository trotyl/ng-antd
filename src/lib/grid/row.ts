import { Directive, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { NgClass, NgStyle } from '@angular/common'
import { HostElement } from '../core/host-element'

const prefix = 'ant-row'

@Directive({
  selector: 'ant-row, [antRow]',
  providers: [ NgClass, NgStyle, HostElement ],
})
export class Row implements OnChanges, OnInit {
  @Input() align: 'top' | 'middle' | 'bottom' | null = null
  @Input() gutter: number = 0
  @Input() justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | null = null
  @Input() type: 'flex' | null = null

  @Input()
  set antRow(value: 'flex' | '' | null) {
    if (value !== '') { this.type = value }
  }

  constructor(
    @Self() private host: HostElement,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
    this.updateHostStyles()
  }

  ngOnInit(): void {
    if (!this.host.classes) {
      this.updateHostClasses()
    }
  }

  private updateHostClasses(): void {
    const isFlex = this.type === 'flex'
    this.host.classes = {
      [`${prefix}`]: !isFlex,
      [`${prefix}-flex`]: isFlex,
      [`${prefix}-flex-${this.justify}`]: !!this.justify,
      [`${prefix}-flex-${this.align}`]: !!this.align,
    }
  }

  private updateHostStyles(): void {
    const margin = this.gutter / -2
    if (margin !== 0) {
      this.host.styles = {
        'margin-left': `${margin}px`,
        'margin-right': `${margin}px`,
      }
    } else {
      this.host.styles = { }
    }
  }
}
