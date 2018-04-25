import { ChangeDetectionStrategy, Directive, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { NgClass } from '@angular/common'
import { exists, getSizeToken } from '../core/lang'
import { HostElement } from '../core/host-element'

const prefix = 'ant-btn-group'

@Directive({
  selector: 'ant-btn-group, [antBtnGroup]',
  providers: [ NgClass, HostElement ],
})
export class ButtonGroup implements OnChanges, OnInit {
  @Input() size: 'large' | 'small' | 'default' = 'default'

  @Input()
  set antBtnGroup(value: 'large' | 'small' | 'default' | '' | undefined) {
    if (value) { this.size = value }
  }

  constructor(@Self() private host: HostElement) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  ngOnInit(): void {
    if (!this.host.classes) {
      this.updateHostClasses()
    }
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${prefix}`]: true,
      [`${prefix}-${getSizeToken(this.size)}`]: exists(this.size),
    }
  }
}
