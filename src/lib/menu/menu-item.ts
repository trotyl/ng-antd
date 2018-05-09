import { coerceBooleanProperty as boolify } from '@angular/cdk/coercion'
import { Directive, Host, HostBinding, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges } from '@angular/core'
import { merge } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Governor } from '../extension/governor'
import { Hover } from '../extension/hover'
import { ControlItem } from '../util/control'
import { assert } from '../util/debug'
import { Menu } from './menu'
import { MENU_PREFIX } from './token'

@Directive({
  selector: '[antMenuItem]',
  exportAs: 'antMenuItem',
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
    @Inject(MENU_PREFIX) basePrefix: string,
    @Optional() @Self() private governor: Governor,
    @Optional() @Self() private hover: Hover,
    @Optional() @Host() private menu: Menu,
  ) {
    super()

    /*@__PURE__*/assert(`antMenuItem: missing 'antMenu' in scope`, !menu)

    this.prefix = `${basePrefix}-item`
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  ngOnInit(): void {
    this.governor.configureStaticClasses([ this.prefix ])

    if (this.menu.mode === 'inline') {
      this.governor.configureStyles({
        'padding-left': `${24 * this.menu.level}px`,
      })
    }

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
    this.governor.configureClasses({
      [`${this.prefix}-selected`]: this.key === this.menu.value,
      [`${this.prefix}-active`]: this.active && !disabled,
      [`${this.prefix}-disabled`]: disabled,
    })
  }
}
