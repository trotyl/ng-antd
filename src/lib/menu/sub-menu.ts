import { isDevMode, ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit, Optional, Self, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core'
import { Combo } from '../combo/combo'
import { Governor } from '../governor/governor'
import { assertExist } from '../util/debug'
import { Menu } from './menu'
import { MENU_PREFIX } from './token'

@Component({
  selector: '[antSubMenu]',
  templateUrl: './sub-menu.html',
  exportAs: 'antSubMenu',
  providers: [
    Combo,
    Governor,
  ],
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
    private vcRef: ViewContainerRef,
    @Self() private combo: Combo,
    @Self() private governor: Governor,
    @Inject(MENU_PREFIX) basePrefix: string,
    @Optional() private menu: Menu,
  ) {
    this.prefix = `${basePrefix}-submenu`
    this.titleCls = [ `${this.prefix}-title` ]
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  ngOnInit(): void {
    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertExist(this.menu, `antSubMenu: must under 'antMenu'`)
    }

    this.governor.staticClasses = [ this.prefix ]
    this.updateHostClasses()

    this.combo.init(this.template, this.vcRef)
  }

  private updateHostClasses(): void {
    const mode = this.menu ? this.menu.mode : 'error'
    const theme = this.menu ? this.menu.theme : 'error'

    this.governor.classes = {
      [`${this.prefix}-${mode}`]: true,
    }
    this.popupCls = {
      [`${this.prefix}`]: true,
      [`${this.prefix}-popup`]: true,
      [`${this.prefix}-${theme}`]: true,
      [`${this.prefix}-placement-bottomLeft`]: true,
    }
  }
}
