import { coerceBooleanProperty as boolify } from '@angular/cdk/coercion'
import { isDevMode, Directive, ElementRef, HostBinding, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges } from '@angular/core'
import { fromEvent } from 'rxjs/observable/fromEvent'
import { merge } from 'rxjs/observable/merge'
import { tap } from 'rxjs/operators'
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
  private active: boolean = false

  constructor(
    private el: ElementRef,
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

    this.status$$ = merge(
      this.menu.status$,
      fromEvent(this.el.nativeElement, 'mouseenter').pipe(tap(() => this.active = true)),
      fromEvent(this.el.nativeElement, 'mouseleave').pipe(tap(() => this.active = false)),
    ).subscribe(() => this.updateHostClasses())
  }

  ngOnDestroy(): void {
    /* istanbul ignore else */
    if (this.status$$) this.status$$.unsubscribe()
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${this.prefix}-selected`]: this.value === this.menu.value,
      [`${this.prefix}-active`]: this.active,
      [`${this.prefix}-disabled`]: boolify(this.disabled),
    }
  }
}
