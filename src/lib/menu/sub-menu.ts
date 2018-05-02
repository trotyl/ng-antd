import { Component, Inject, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { Governor } from '../governor/governor'
import { MENU_PREFIX } from './token'

@Component({
  selector: '[antSubMenu]',
  templateUrl: './sub-menu.html',
  exportAs: 'antSubMenu',
  providers: [
    Governor,
  ],
})
export class SubMenu implements OnChanges, OnInit {
  @Input() key: string

  @Input()
  set antSubMenu(value: string | '') {
    if (value !== '') { this.key = value }
  }

  private prefix: string

  constructor(
    @Self() private governor: Governor,
    @Inject(MENU_PREFIX) basePrefix: string,
  ) {
    this.prefix = `${basePrefix}-submenu`
  }

  ngOnInit(): void {
    this.governor.staticClasses = [ this.prefix ]
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
