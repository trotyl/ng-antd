import { Directive, Inject, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { Governor } from '../governor/governor'
import { getSizeToken } from '../util/size'
import { BUTTON_GROUP_PREFIX } from './token'

@Directive({
  selector: 'ant-btn-group, [antBtnGroup]',
  providers: [ Governor ],
})
export class ButtonGroup implements OnChanges, OnInit {
  @Input() size: 'large' | 'small' | null = null

  @Input()
  set antBtnGroup(value: 'large' | 'small' | '' | null) {
    if (value !== '') { this.size = value }
  }

  constructor(
    @Inject(BUTTON_GROUP_PREFIX) private prefix: string,
    @Self() private governor: Governor,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  ngOnInit(): void {
    this.governor.staticClasses = [ this.prefix ]
  }

  private updateHostClasses(): void {
    this.governor.classes = {
      [`${this.prefix}-${getSizeToken(this.size, 'antBtnGroup')}`]: !!this.size,
    }
  }
}
