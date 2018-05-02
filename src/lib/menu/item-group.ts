import { Directive, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { Governor } from '../governor/governor'

const prefix = 'ant-menu-item-group'

@Directive({
  selector: '[antMenuItemGroup]',
  exportAs: 'antMenuItemGroup',
  providers: [
    Governor,
  ],
})
export class ItemGroup implements OnChanges, OnInit {
  @Input() key: string

  @Input()
  set antMenuItem(value: string | '') {
    if (value !== '') { this.key = value }
  }

  constructor(@Self() private governor: Governor) { }

  ngOnInit(): void {
    this.governor.staticClasses = [ prefix ]
    this.updateHostClasses()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  private updateHostClasses(): void {
    this.governor.classes = {

    }
  }
}
