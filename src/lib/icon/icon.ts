import { Directive, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges } from '@angular/core'
/* tslint:disable-next-line:no-unused-variable */
import { Observable, Subject } from 'rxjs'
import { map, takeUntil, tap } from 'rxjs/operators'
import { Governor } from '../extension/governor'
import { assert } from '../util/debug'
import { extractInputs, updateClass } from '../util/reactive'
import { ICON_PREFIX } from './token'

@Directive({
  selector: '[antIcon]',
})
export class Icon implements OnChanges, OnDestroy, OnInit {
  @Input() antIcon: string
  @Input() type: string
  @Input() spin: boolean

  onChanges$ = new Subject<SimpleChanges>()
  onDestroy$ = new Subject<void>()

  input$ = this.onChanges$.pipe(
    extractInputs({
      antIcon: null as string | null,
      type: null as string | null,
      spin: false,
    }),
    tap(inputs => inputs.type = inputs.type != null ? inputs.type : inputs.antIcon),
  )

  constructor(
    @Inject(ICON_PREFIX) prefix: string,
    @Optional() @Self() governor: Governor,
  ) {
    governor.configureStaticClasses([ prefix ])

    const className$ = this.input$.pipe(
      map(({ type, spin }) => ({
        [`${prefix}-${type}`]: !!type,
        [`${prefix}-spin`]: spin || type === 'loading',
      })),
      updateClass(governor),
    )

    const status$ = className$.pipe(
      takeUntil(this.onDestroy$),
    )

    status$.subscribe()
  }

  ngOnChanges(changes: SimpleChanges): void { /*@__PURE__*/checkInputs(this); this.onChanges$.next(changes) }
  ngOnInit(): void { /*@__PURE__*/checkInputs(this) }
  ngOnDestroy(): void { this.onDestroy$.next() }
}

function checkInputs(ctx: Icon): void {
  assert(`antIcon: missing 'type' input`, ctx.antIcon == null || ctx.antIcon === '', ctx.type == null || ctx.type === '')
}
