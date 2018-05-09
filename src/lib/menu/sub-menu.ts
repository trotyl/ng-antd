import { ChangeDetectionStrategy, Component, Host, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges, TemplateRef, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { Combo } from '../extension/combo'
import { Governor } from '../extension/governor'
import { KeyedCompositeControl } from '../util/control'
import { assert } from '../util/debug'
import { Menu } from './menu'
import { MENU_PREFIX } from './token'

@Component({
  selector: '[antSubMenu]',
  templateUrl: './sub-menu.html',
  exportAs: 'antSubMenu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class SubMenu extends KeyedCompositeControl<string, boolean> implements OnChanges, OnDestroy, OnInit {
  @Input() key: string
  @Input() title: string

  @ViewChild('popUp') popUpTemplate: TemplateRef<void>

  @Input()
  set antSubMenu(value: string | '') {
    /* istanbul ignore else */
    if (value !== '') { this.key = value }
  }

  inline = false
  opened = false
  popupCls: { [name: string]: boolean } = {}
  titleCls: string[] = []
  titleStyles: { [name: string]: string } = {}
  arrowCls: string[] = []

  get parentComposite(): Menu {
    return this.menu
  }

  private prefix: string
  private onDestroy$: Subject<void> = new Subject()

  constructor(
    @Inject(MENU_PREFIX) basePrefix: string,
    @Optional() @Self() private combo: Combo,
    @Optional() @Self() private governor: Governor,
    @Optional() @Host() private menu: Menu,
  ) {
    super()

    /*@__PURE__*/assert(`antSubMenu: missing 'antMenu' in scope`, !menu)

    this.prefix = `${basePrefix}-submenu`
    this.titleCls = [ `${this.prefix}-title` ]
    this.arrowCls = [ `${this.prefix}-arrow` ]
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  ngOnInit(): void {
    this.inline = this.menu.mode === 'inline'

    this.governor.configureStaticClasses([ this.prefix ])
    this.updateHostClasses()

    if (this.inline) {
      this.titleStyles = { 'padding-left': `${24 * this.menu.level}px` }
    } else {
      this.combo.configTemplate(this.popUpTemplate)
    }

    if (this.key) {
      this.menu.observeKey(this.key)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(res => this.opened = res)
    }
  }

  ngOnDestroy(): void { this.onDestroy$.next() }

  toggle(): void {
    this.opened = !this.opened
    this.updateHostClasses()
  }

  private updateHostClasses(): void {
    this.governor.configureClasses({
      [`${this.prefix}-${this.menu.mode}`]: true,
      [`${this.prefix}-open`]: this.inline && this.opened,
    })
    this.popupCls = {
      [`${this.prefix}`]: true,
      [`${this.prefix}-popup`]: true,
      [`${this.prefix}-${this.menu.theme}`]: true,
      [`${this.prefix}-placement-bottomLeft`]: true,
    }
  }
}
