import { forwardRef, AfterViewInit, ChangeDetectionStrategy, Component, Host, HostBinding, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges, SkipSelf, TemplateRef, ViewChild } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { combineLatest, Observable, Subject } from 'rxjs'
import { map, shareReplay, startWith, takeUntil } from 'rxjs/operators'
import { Governor } from '../extension/governor'
import { Fragment } from '../fragment/fragment'
import { FragmentContainer } from '../fragment/token'
import { KeyedCompositeControl } from '../util/control'
import { assert, notEmpty } from '../util/debug'
import { updateClass } from '../util/reactive'
import { MENU_PREFIX, TemplateOutlet } from './token'

@Component({
  selector: '[antMenu]',
  templateUrl: './menu.html',
  exportAs: 'antMenu',
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => Menu) },
    { provide: FragmentContainer, useExisting: forwardRef(() => Menu) },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class Menu extends KeyedCompositeControl<string, boolean> implements AfterViewInit, FragmentContainer, OnChanges, OnDestroy, OnInit {
  /**
   * type of the menu
   */
  @Input() mode: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline' = 'vertical'

  /**
   * color theme of the menu
   */
  @Input() theme: 'light' | 'dark' = 'light'

  @Input() set antMenu(value: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline' | '') { if (value !== '') this.mode = value }

  @HostBinding('attr.role') @Input() role: string = 'menu'
  @HostBinding('attr.tabindex') @Input() tabIndex: string = '0'

  /**
   * @internal
   */
  @ViewChild('groupWrapper', { static: true }) groupWrapper: TemplateRef<{ template: TemplateRef<void> }>

  /**
   * @internal
   */
  readonly level: number

  /**
   * @internal
   */
  readonly containers: TemplateOutlet[] = []

  /**
   * @internal
   */
  readonly parentComposite: Menu

  onChanges$ = new Subject<SimpleChanges>()
  onInit$ = new Subject<void>()
  onDestroy$ = new Subject<void>()

  input$ = this.onChanges$.pipe(
    map(() => this),
    startWith(this),
  )

  mode$: Observable<string>
  theme$ = this.input$.pipe(map(({ theme }) => theme), shareReplay(1))

  constructor(
    @Inject(MENU_PREFIX) prefix: string,
    @Optional() @Self() governor: Governor,
    @Optional() @Host() @SkipSelf() parent: Menu,
  ) {
    super()

    this.level = 1
    this.mode$ = this.input$.pipe(map(({ mode }) => mode), shareReplay(1))

    if (parent) {
      this.level = parent.level + 1
      this.mode$ = parent.mode$.pipe(map(resolveMode), shareReplay(1))
      this.parentComposite = parent
    }

    governor.configureStaticClasses([ prefix ])

    const className$ = combineLatest(this.input$, this.mode$).pipe(
      map(([{ theme }, mode]) => ({
        [`${prefix}-${theme}`]: !parent,
        [`${prefix}-${mode}`]: true,
        [`${prefix}-${parent ? 'sub' : 'root'}`]: true,
      })),
      updateClass(governor),
    )

    const status$ = className$.pipe(
      takeUntil(this.onDestroy$),
    )

    status$.subscribe()
  }

  ngOnChanges(changes: SimpleChanges): void { this.onChanges$.next(changes) }
  ngOnInit(): void { this.onInit$.next() }
  ngAfterViewInit(): void { /*@__PURE__*/checkContents(this) }
  ngOnDestroy(): void { this.onDestroy$.next() }

  register(fragment: Fragment): void {
    /* istanbul ignore else */
    if (fragment.type === 'antContent') {
      fragment.viewContainer.createEmbeddedView(this.groupWrapper, { template: fragment.template })
    }
  }

  deregister(fragment: Fragment): void { }

  open(...keys: string[]): void {
    for (const key of keys) {
      this.pendingKeyedChanges.set(key, true)
      this.flushKey(key)
    }
  }

  close(...keys: string[]): void {
    for (const key of keys) {
      this.pendingKeyedChanges.set(key, false)
      this.flushKey(key)
    }
  }
}

/* istanbul ignore next */
function resolveMode(parentMode: string): 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline' {
  switch (parentMode) {
    case 'inline':
      return 'inline'
    default:
      return 'vertical'
  }
}

function checkContents(ctx: Menu): void {
  assert(`antMenu: unexpected dangling 'antContent' with no 'antMenuItemGroup' found`, notEmpty(ctx.containers))
}
