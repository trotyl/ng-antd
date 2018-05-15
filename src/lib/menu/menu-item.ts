import { Directive, Host, HostBinding, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges } from '@angular/core'
/* tslint:disable-next-line:no-unused-variable */
import { combineLatest, merge, Observable, Subject } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { Governor } from '../extension/governor'
import { Hover } from '../extension/hover'
import { ControlItem } from '../util/control'
import { assert } from '../util/debug'
import { extractInputs, updateClass, updateStyle } from '../util/reactive'
import { Menu } from './menu'
import { MENU_PREFIX } from './token'

@Directive({
  selector: '[antMenuItem]',
  exportAs: 'antMenuItem',
})
export class MenuItem extends ControlItem implements OnChanges, OnDestroy, OnInit {
  @Input() antMenuItem: string | ''
  @Input() key: string
  @Input() disabled: boolean

  @HostBinding('attr.role') @Input() role: string = 'menuitem'

  onChanges$ = new Subject<SimpleChanges>()
  onInit$ = new Subject<void>()
  onDestroy$ = new Subject<void>()

  input$ = this.onChanges$.pipe(
    extractInputs({
      antMenuItem: null as string | null,
      key: null as string | null,
      disabled: false,
    }),
    map(inputs => ({ ...inputs, key: inputs.key != null ? inputs.key : inputs.antMenuItem })),
  )

  constructor(
    @Inject(MENU_PREFIX) basePrefix: string,
    @Optional() @Self() governor: Governor,
    @Optional() @Self() hover: Hover,
    @Optional() @Host() menu: Menu,
  ) {
    super()

    /*@__PURE__*/checkDeps(menu)

    const prefix = `${basePrefix}-item`

    governor.configureStaticClasses([ prefix ])

    const active$ = hover.changes.pipe(startWith(false))
    const modelValue$ = menu.modelValue$.pipe(startWith(null as string | null))

    const className$ = combineLatest(this.input$, active$, modelValue$).pipe(
      map(([{ key, disabled }, active, modelValue]) => ({
        [`${prefix}-selected`]: key === modelValue,
        [`${prefix}-active`]: active && !disabled,
        [`${prefix}-disabled`]: disabled,
      })),
      updateClass(governor),
    )

    const style$ = menu.mode$.pipe(
      map(mode => mode === 'inline' ? { 'padding-left': `${24 * menu.level}px` } : {} as {}),
      updateStyle(governor),
    )

    const status$ = merge(
      className$,
      style$,
    )

    status$.subscribe()
  }

  ngOnChanges(changes: SimpleChanges): void { this.onChanges$.next(changes) }
  ngOnInit(): void { this.onInit$.next() }
  ngOnDestroy(): void { this.onDestroy$.next() }
}

function checkDeps(menu: Menu | null): void {
  assert(`antMenuItem: missing 'antMenu' in scope`, !menu)
}
