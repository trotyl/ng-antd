import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit, Self, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core'
import { Combo } from '../combo/combo'
import { Governor } from '../governor/governor'
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
  @Input() value: string
  @ViewChild('subMenu') template: TemplateRef<void>

  @Input()
  set antSubMenu(value: string | '') {
    /* istanbul ignore else */
    if (value !== '') { this.value = value }
  }

  popupCls: { [name: string]: boolean } = {}
  titleCls: string[] = []

  private prefix: string

  constructor(
    private vcRef: ViewContainerRef,
    @Self() private combo: Combo,
    @Self() private governor: Governor,
    @Inject(MENU_PREFIX) basePrefix: string,
    private menu: Menu,
  ) {
    this.prefix = `${basePrefix}-submenu`
    this.titleCls = [ `${this.prefix}-title` ]
  }

  ngOnInit(): void {
    this.governor.staticClasses = [ this.prefix ]
    this.updateHostClasses()

    this.combo.init(this.template, this.vcRef)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  private updateHostClasses(): void {
    this.governor.classes = {
      [`${this.prefix}-${this.menu.mode}`]: true,
    }
    this.popupCls = {
      [`${this.prefix}`]: true,
      [`${this.prefix}-popup`]: true,
      [`${this.prefix}-${this.menu.theme}`]: true,
      [`${this.prefix}-placement-bottomLeft`]: true,
    }
  }
}
