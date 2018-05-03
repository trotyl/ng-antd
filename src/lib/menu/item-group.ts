import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, Self, TemplateRef, ViewChild } from '@angular/core'
import { Governor } from '../governor/governor'
import { Menu } from './menu'
import { MENU_PREFIX, TemplateOutlet } from './token'

@Component({
  selector: '[antMenuItemGroup]',
  templateUrl: './item-group.html',
  exportAs: 'antMenuItemGroup',
  providers: [
    Governor,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MenuItemGroup implements OnInit {
  @Input() title: string

  @ViewChild('titleTemplate') titleTemplate: TemplateRef<void>

  @Input()
  set antMenuItemGroup(value: string | '') {
    /* istanbul ignore else */
    if (value !== '') { this.title = value }
  }

  titleCls: string[] = []

  private prefix: string
  private container: TemplateOutlet

  constructor(
    @Self() private governor: Governor,
    @Inject(MENU_PREFIX) basePrefix: string,
    menu: Menu,
  ) {
    this.prefix = `${basePrefix}-item-group-list`
    this.container = menu.containers.shift()!
  }

  ngOnInit(): void {
    this.governor.staticClasses = [ this.prefix ]
    this.container.mount(this.titleTemplate)
  }
}
