import { ChangeDetectionStrategy, Component, Host, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges, TemplateRef, ViewChild } from '@angular/core'
import { combineLatest, merge, Observable, Subject } from 'rxjs'
import { distinctUntilChanged, filter, map, scan, shareReplay, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators'
import { Expansion } from '../extension/expansion'
import { Governor } from '../extension/governor'
import { KeyedCompositeControl } from '../util/control'
import { assert } from '../util/debug'
import { updateClass } from '../util/reactive'
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

  @Input() set antSubMenu(value: string | '') { if (value !== '') this.key = value }

  @ViewChild('popUp') popUpTemplate: TemplateRef<void>

  readonly parentComposite: Menu
  readonly titleClasses: { [name: string]: boolean } = {}
  readonly arrowClasses: { [name: string]: boolean } = {}

  popupClasses$: Observable<{ [name: string]: boolean }>
  titleStyles$: Observable<{ [name: string]: string }>

  onChanges$ = new Subject<SimpleChanges>()
  onInit$ = new Subject<void>()
  onDestroy$ = new Subject<void>()

  input$ = this.onChanges$.pipe(
    map(() => this),
    startWith(this),
  )

  toggle$ = new Subject<void>()
  inline$: Observable<boolean>
  inlineContent$: Observable<boolean>

  constructor(
    @Inject(MENU_PREFIX) basePrefix: string,
    @Optional() @Self() expansion: Expansion,
    @Optional() @Self() governor: Governor,
    @Optional() @Host() menu: Menu,
  ) {
    super()

    /*@__PURE__*/checkDeps(menu)
    this.parentComposite = menu

    const prefix = `${basePrefix}-submenu`

    governor.configureStaticClasses([ prefix ])

    this.titleClasses = { [`${prefix}-title`]: true }
    this.arrowClasses = { [`${prefix}-arrow`]: true }

    const keyStatus$ = this.input$.pipe(
      map(({ key }) => key),
      filter(key => key != null),
      distinctUntilChanged(),
      switchMap(key => menu.observeKey(key!)),
    )

    const opened$: Observable<boolean> = merge(this.toggle$, keyStatus$).pipe(
      startWith<boolean | void>(false),
      // TODO: remove unnecessary type conversion caused by ng-packagr issue
      scan<boolean | void, boolean>(((pre, cur) => cur != null ? cur as boolean : !pre), false),
    )

    this.inline$ = menu.mode$.pipe(
      map(mode => mode === 'inline'),
      shareReplay(1),
    )

    this.inlineContent$ = combineLatest(
      this.inline$,
      opened$,
    ).pipe(
      map(([inline, opened]) => inline && opened),
      shareReplay(1),
    )

    const className$ = combineLatest(this.inlineContent$, menu.mode$).pipe(
      map(([opened, mode]) => ({
        [`${prefix}-${mode}`]: true,
        [`${prefix}-open`]: opened,
      })),
      updateClass(governor),
    )

    this.titleStyles$ = this.inline$.pipe(
      map(inline => inline ? { 'padding-left': `${24 * menu.level}px` } : {} as {}),
    )

    // TODO: support changing 'mode' dynamically
    const expansion$ = this.onInit$.pipe(
      switchMap(() => this.inline$),
      take(1),
      filter(inline => !inline),
      tap(() => expansion.configTemplate(this.popUpTemplate)),
    )

    this.popupClasses$ = menu.theme$.pipe(
      map((theme) => ({
        [`${prefix}`]: true,
        [`${prefix}-popup`]: true,
        [`${prefix}-${theme}`]: true,
        [`${prefix}-placement-bottomLeft`]: true,
      })),
    )

    const status$ = merge(
      className$,
      expansion$,
    ).pipe(
      takeUntil(this.onDestroy$),
    )

    status$.subscribe()
  }

  ngOnChanges(changes: SimpleChanges): void { this.onChanges$.next(changes) }
  ngOnInit(): void { this.onInit$.next() }
  ngOnDestroy(): void { this.onDestroy$.next() }
}

function checkDeps(menu: Menu | null): void {
  assert(`antSubMenu: missing 'antMenu' in scope`, !menu)
}
