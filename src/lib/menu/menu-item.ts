import { coerceBooleanProperty as boolify } from '@angular/cdk/coercion'
import { isDevMode, Directive, Host, HostBinding, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges } from '@angular/core'
import { merge } from 'rxjs/observable/merge'
import { tap } from 'rxjs/operators'
import { Hover } from '../extension/hover'
import { Governor } from '../governor/governor'
import { ControlItem } from '../util/control'
import { assertExist } from '../util/debug'
import { Menu } from './menu'
import { MENU_PREFIX } from './token'

@Directive({
  selector: '[antMenuItem]',
  exportAs: 'antMenuItem',
  providers: [
    Governor,
  ],
})
export class MenuItem extends ControlItem implements OnChanges, OnDestroy, OnInit {
  @Input() key: string
  @Input() disabled: boolean = false

  @HostBinding('attr.role') @Input() role: string = 'menuitem'

  @Input()
  set antMenuItem(value: string | '') {
    if (value !== '') { this.key = value }
  }

  private prefix: string
  private active: boolean = false

  constructor(
    @Self() private governor: Governor,
    @Self() private hover: Hover,
    @Inject(MENU_PREFIX) basePrefix: string,
    @Optional() @Host() private menu: Menu,
  ) {
    super()

    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertExist(this.menu, `antMenuItem: missing 'antMenu' in scope`)
    }

    this.prefix = `${basePrefix}-item`
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  ngOnInit(): void {
    this.governor.staticClasses = [ this.prefix ]

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
    this.governor.classes = {
      [`${this.prefix}-selected`]: this.key === this.menu.value,
      [`${this.prefix}-active`]: this.active && !disabled,
      [`${this.prefix}-disabled`]: disabled,
    }
  }
}
