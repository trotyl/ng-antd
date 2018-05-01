import { Directive, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { HostManager } from '../host-manager/host-manager'
import { getSizeToken } from '../util/size'

const prefix = 'ant-btn-group'

@Directive({
  selector: 'ant-btn-group, [antBtnGroup]',
  providers: [ HostManager ],
})
export class ButtonGroup implements OnChanges, OnInit {
  @Input() size: 'large' | 'small' | null = null

  @Input()
  set antBtnGroup(value: 'large' | 'small' | '' | null) {
    if (value !== '') { this.size = value }
  }

  constructor(@Self() private host: HostManager) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  ngOnInit(): void {
    this.host.staticClasses = [ prefix ]
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${prefix}-${getSizeToken(this.size)}`]: !!this.size,
    }
  }
}
