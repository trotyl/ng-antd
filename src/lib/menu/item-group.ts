import { isDevMode, ChangeDetectionStrategy, Component, Inject, Input, OnInit, Optional, Self, TemplateRef, ViewChild } from '@angular/core'
import { Governor } from '../governor/governor'
import { assertExist } from '../util/debug'
import { Menu } from './menu'
import { MENU_PREFIX } from './token'

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
  @Input() key: string
  @Input() title: string

  @ViewChild('titleTemplate') titleTemplate: TemplateRef<void>

  @Input()
  set antMenuItemGroup(value: string | '') {
    /* istanbul ignore else */
    if (value !== '') { this.key = value }
  }

  titleCls: string[] = []

  private prefix: string

  constructor(
    @Self() private governor: Governor,
    @Inject(MENU_PREFIX) basePrefix: string,
    @Optional() private menu: Menu,
  ) {
    this.prefix = `${basePrefix}-item-group-list`
  }

  ngOnInit(): void {
    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertExist(this.menu, `antMenuItemGroup: missing 'antMenu' in scope`)
    }

    const container = this.menu.containers.shift()

    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertExist(container, `antMenuItemGroup: missing 'antContent' in scope`)
    }

    container!.mount(this.titleTemplate)
    this.governor.staticClasses = [ this.prefix ]
  }
}
