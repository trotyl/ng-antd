import { Directive, Inject, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { HostManager } from '../host-manager/host-manager'
import { getSizeToken } from '../util/size'
import { BUTTON_GROUP_PREFIX } from './token'

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

  constructor(
    @Inject(BUTTON_GROUP_PREFIX) private prefix: string,
    @Self() private host: HostManager,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  ngOnInit(): void {
    this.host.staticClasses = [ this.prefix ]
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${this.prefix}-${getSizeToken(this.size)}`]: !!this.size,
    }
  }
}
