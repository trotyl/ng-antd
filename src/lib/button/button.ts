import { coerceBooleanProperty } from '@angular/cdk/coercion'
import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnDestroy, Optional, Self, SimpleChanges } from '@angular/core'
/* tslint:disable-next-line:no-unused-variable */
import { Observable, Subject } from 'rxjs'
import { map, takeUntil } from 'rxjs/operators'
import { Governor } from '../extension/governor'
import { assert } from '../util/debug'
import { extractInputs, updateClass } from '../util/reactive'
import { BUTTON_PREFIX } from './token'
import { toButtonSize } from './util'

@Component({
  selector: '[antBtn]',
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class Button implements OnChanges, OnDestroy {
  @Input() antBtn: 'primary' | 'dashed' | 'danger' | '' | null
  @Input() color: 'primary' | 'dashed' | 'danger' | null
  @Input() size: 'large' | 'small' | null
  @Input() icon: string | null
  @Input() shape: 'circle' | null
  @Input() loading: boolean
  @Input() ghost: boolean
  @Input() iconOnly: boolean

  onChanges$ = new Subject<SimpleChanges>()
  onDestroy$ = new Subject<void>()

  input$ = this.onChanges$.pipe(
    extractInputs({
      antBtn: null as string | null,
      color: null as string | null,
      size: null as string | null,
      icon: null as string | null,
      shape: null as string | null,
      loading: false, ghost: false, iconOnly: false,
    }),
  )

  icon$ = this.input$.pipe(map(({ icon, loading }) => icon || (loading ? 'loading' : null)))
  hasContent$ = this.input$.pipe(map(({ iconOnly, shape }) => !iconOnly && shape !== 'circle'))

  constructor(
    @Inject(BUTTON_PREFIX) prefix: string,
    @Optional() @Self() governor: Governor,
  ) {
    governor.configureStaticClasses([ prefix ])

    const className$ = this.input$.pipe(
      map(({ antBtn, color, size, shape, loading, ghost, iconOnly }) => ({
        [`${prefix}-${color || antBtn || 'colornoop'}`]: !!(color || antBtn),
        [`${prefix}-${toButtonSize(size)}`]: !!size,
        [`${prefix}-circle`]: shape === 'circle',
        [`${prefix}-icon-only`]: iconOnly || shape === 'circle',
        [`${prefix}-loading`]: loading,
        [`${prefix}-background-ghost`]: ghost,
      })),
      updateClass(governor),
    )

    const status$ = className$.pipe(
      takeUntil(this.onDestroy$),
    )

    status$.subscribe()
  }

  ngOnChanges(changes: SimpleChanges): void { /*@__PURE__*/checkInputs(this); this.onChanges$.next(changes) }
  ngOnDestroy(): void { this.onDestroy$.next() }
}

function checkInputs(ctx: Button): void {
  assert(`antBtn: unexpected 'loading' input with 'icon' set`, coerceBooleanProperty(ctx.loading), ctx.icon != null)
  assert(`antBtn: unexpected 'iconOnly' input without 'icon' set`, coerceBooleanProperty(ctx.iconOnly), ctx.icon == null)
}
