import { coerceBooleanProperty as boolify } from '@angular/cdk/coercion'
import { isDevMode, Directive, HostBinding, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges } from '@angular/core'
import { merge } from 'rxjs/observable/merge'
import { tap } from 'rxjs/operators'
import { HostManager } from '../host-manager/host-manager'
import { Hover } from '../hover/hover'
import { ControlItem } from '../util/control'
import { assertExist } from '../util/debug'
import { Menu } from './menu'
import { MENU_PREFIX } from './token'

@Directive({
  selector: '[antMenuItem]',
  exportAs: 'antMenuItem',
  providers: [
    HostManager,
    Hover,
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
  private active: boolean = false

  constructor(
    @Self() private host: HostManager,
    @Self() private hover: Hover,
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

    this.status$$ = merge(
      this.menu.status$,
      this.hover.changes.pipe(tap(x => this.active = x)),
    ).subscribe(() => this.updateHostClasses())
  }

  ngOnDestroy(): void {
    /* istanbul ignore else */
    if (this.status$$) this.status$$.unsubscribe()
  }

  private updateHostClasses(): void {
    const disabled = boolify(this.disabled)
    this.host.classes = {
      [`${this.prefix}-selected`]: this.value === this.menu.value,
      [`${this.prefix}-active`]: this.active && !disabled,
      [`${this.prefix}-disabled`]: disabled,
    }
  }
}
