import { isDevMode, ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Inject, Input, OnInit, Optional, Self, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core'
import { Governor } from '../governor/governor'
import { assertExist } from '../util/debug'
import { Menu } from './menu'
import { MENU_PREFIX, TemplateOutlet } from './token'

@Component({
  selector: '[antMenuItemGroupContainer]',
  templateUrl: './item-group-container.html',
  exportAs: 'antMenuItemGroupContainer',
  providers: [
    Governor,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MenuItemGroupContainer implements OnInit, TemplateOutlet {
  @Input() itemGroup: TemplateRef<void>

  @Input()
  set antMenuItemGroupContainer(value: TemplateRef<void> | '') {
    /* istanbul ignore else */
    if (value !== '') this.itemGroup = value
  }

  @ViewChild('titleOutlet', { read: ViewContainerRef }) titleOutlet: ViewContainerRef

  titleCls: string [] = []

  private prefix: string

  constructor(
    private cdRef: ChangeDetectorRef,
    @Self() private governor: Governor,
    @Inject(MENU_PREFIX) basePrefix: string,
    @Optional() @Host() private menu: Menu,
  ) {
    this.prefix = `${basePrefix}-item-group`
  }

  ngOnInit(): void {
    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertExist(this.menu, `antMenuItemGroupContainer: missing 'antMenu' in scope`)
    }

    this.menu.containers.push(this)

    this.governor.staticClasses = [ this.prefix ]
    this.titleCls = [ `${this.prefix}-title` ]
  }

  mount(template: TemplateRef<void>): void {
    this.titleOutlet.createEmbeddedView(template)
    this.cdRef.detectChanges()
  }
}
