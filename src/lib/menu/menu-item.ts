import { coerceBooleanProperty as boolify } from '@angular/cdk/coercion'
import { isDevMode, Directive, HostBinding, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges } from '@angular/core'
import { HostManager } from '../host-manager/host-manager'
import { ControlItem } from '../util/control'
import { assertExist } from '../util/debug'
import { Menu } from './menu'
import { MENU_PREFIX } from './token'

@Directive({
  selector: '[antMenuItem]',
  exportAs: 'antMenuItem',
  providers: [
    HostManager,
  ],
})
export class MenuItem extends ControlItem implements OnChanges, OnDestroy, OnInit {
  @Input() value: string
  @Input() disabled: boolean = false

  @HostBinding('attr.role') @Input() role: string = 'menuitem'

  @Input()
  set antMenuItem(value: string | '') {
    if (value !== '') { this.value = value }
  }

  private prefix: string

  constructor(
    @Self() private host: HostManager,
    @Inject(MENU_PREFIX) basePrefix: string,
    @Optional() private menu: Menu,
  ) {
    super()

    this.prefix = `${basePrefix}-item`
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.updateHostClasses()
    }
  }

  ngOnInit(): void {
    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertExist(this.menu, `antMenuItem: must under 'antMenu'`)
    }

    this.host.staticClasses = [ this.prefix ]

    this.status$$ = this.menu.status$.subscribe(() => this.updateHostClasses())
  }

  ngOnDestroy(): void {
    /* istanbul ignore else */
    if (this.status$$) this.status$$.unsubscribe()
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${this.prefix}-selected`]: this.value === this.menu.value,
      // TODO: track mouse hovering
      [`${this.prefix}-active`]: false,
      [`${this.prefix}-disabled`]: boolify(this.disabled),
    }
  }
}
