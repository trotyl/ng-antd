import { isDevMode, ChangeDetectionStrategy, Component, Host, Inject, Input, OnChanges, OnInit, Optional, Self, SimpleChanges, TemplateRef, ViewChild } from '@angular/core'
import { Combo } from '../extension/combo'
import { Governor } from '../extension/governor'
import { assertExist } from '../util/debug'
import { Menu } from './menu'
import { MENU_PREFIX } from './token'

@Component({
  selector: '[antSubMenu]',
  templateUrl: './sub-menu.html',
  exportAs: 'antSubMenu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class SubMenu implements OnChanges, OnInit {
  @Input() key: string
  @ViewChild('subMenu') template: TemplateRef<void>

  @Input()
  set antSubMenu(value: string | '') {
    /* istanbul ignore else */
    if (value !== '') { this.key = value }
  }

  popupCls: { [name: string]: boolean } = {}
  titleCls: string[] = []

  private prefix: string

  constructor(
    @Inject(MENU_PREFIX) basePrefix: string,
    @Optional() @Self() private combo: Combo,
    @Optional() @Self() private governor: Governor,
    @Optional() @Host() private menu: Menu,
  ) {
    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertExist(this.menu, `antSubMenu: missing 'antMenu' in scope`)
    }

    this.prefix = `${basePrefix}-submenu`
    this.titleCls = [ `${this.prefix}-title` ]
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  ngOnInit(): void {
    this.governor.configureStaticClasses([ this.prefix ])
    this.updateHostClasses()

    this.combo.configTemplate(this.template)
  }

  private updateHostClasses(): void {
    this.governor.configureClasses({
      [`${this.prefix}-${this.menu.mode}`]: true,
    })
    this.popupCls = {
      [`${this.prefix}`]: true,
      [`${this.prefix}-popup`]: true,
      [`${this.prefix}-${this.menu.theme}`]: true,
      [`${this.prefix}-placement-bottomLeft`]: true,
    }
  }
}
