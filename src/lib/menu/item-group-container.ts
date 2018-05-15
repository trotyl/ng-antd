import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Inject, Input, Optional, Self, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core'
import { Governor } from '../extension/governor'
import { assert } from '../util/debug'
import { Menu } from './menu'
import { MENU_PREFIX, TemplateOutlet } from './token'

@Component({
  selector: '[antMenuItemGroupContainer]',
  templateUrl: './item-group-container.html',
  exportAs: 'antMenuItemGroupContainer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MenuItemGroupContainer implements TemplateOutlet {
  @Input() itemGroup: TemplateRef<void>

  @Input()
  set antMenuItemGroupContainer(value: TemplateRef<void> | '') {
    /* istanbul ignore else */
    if (value !== '') this.itemGroup = value
  }

  @ViewChild('titleOutlet', { read: ViewContainerRef }) titleOutlet: ViewContainerRef

  readonly titleClasses: { [name: string]: boolean } = { }

  constructor(
    private cdRef: ChangeDetectorRef,
    @Inject(MENU_PREFIX) basePrefix: string,
    @Optional() @Self() governor: Governor,
    @Optional() @Host() menu: Menu,
  ) {
    /*@__PURE__*/checkDeps(menu)

    const prefix = `${basePrefix}-item-group`
    this.titleClasses = { [`${prefix}-title`]: true }
    governor.configureStaticClasses([ prefix ])

    menu.containers.push(this)
  }

  mount(template: TemplateRef<void>): void {
    this.titleOutlet.createEmbeddedView(template)
    this.cdRef.detectChanges()
  }
}

function checkDeps(menu: Menu | null): void {
  assert(`antMenuItemGroupContainer: missing 'antMenu' in scope`, !menu)
}
