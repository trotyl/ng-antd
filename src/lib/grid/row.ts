import { Directive, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges } from '@angular/core'
import { merge, Observable, Subject } from 'rxjs'
import { map, switchMap, takeUntil, tap } from 'rxjs/operators'
import { Governor } from '../extension/governor'
import { Responsive } from '../responsive/responsive'
import { extractInputs, updateClass, updateStyle } from '../util/reactive'
import { ROW_PREFIX } from './token'

@Directive({
  selector: 'ant-row, [antRow]',
})
export class Row implements OnChanges, OnDestroy, OnInit {
  @Input() antRow: 'flex' | '' | null
  @Input() align: 'top' | 'middle' | 'bottom' | null
  @Input() gutter: number
  @Input() justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | null
  @Input() type: 'flex' | null

  @Input('gutter.xs') gutterXs: number
  @Input('gutter.sm') gutterSm: number
  @Input('gutter.md') gutterMd: number
  @Input('gutter.lg') gutterLg: number
  @Input('gutter.xl') gutterXl: number
  @Input('gutter.xxl') gutterXxl: number

  onChanges$ = new Subject<SimpleChanges>()
  onInit$ = new Subject<void>()
  onDestroy$ = new Subject<void>()

  input$ = this.onChanges$.pipe(
    extractInputs({
      antRow: null as string | null,
      type: null as string | null, align: null as string | null, justify: null as string | null,
      gutter: 0, gutterXs: null as number | null, gutterSm: null as number | null, gutterMd: null as number | null, gutterLg: null as number | null, gutterXl: null as number | null, gutterXxl: null as number | null,
    }),
    tap(inputs => inputs.type = inputs.type != null ? inputs.type : inputs.antRow),
  )

  gutter$: Observable<number>

  constructor(
    @Inject(ROW_PREFIX) prefix: string,
    rsp: Responsive,
    @Optional() @Self() governor: Governor,
  ) {
    this.gutter$ = this.input$.pipe(
      map(({ gutter, gutterXs: xs, gutterSm: sm, gutterMd: md, gutterLg: lg, gutterXl: xl, gutterXxl: xxl }) => ({ xs, sm, md, lg, xl, xxl, default: gutter })),
      switchMap(rGutter => rsp.resolve(rGutter)),
    )

    const className$ = this.input$.pipe(
      map(({ type, justify, align }) => ({
        [`${prefix}`]: type !== 'flex',
        [`${prefix}-flex`]: type === 'flex',
        [`${prefix}-flex-${justify}`]: type === 'flex' && justify != null,
        [`${prefix}-flex-${align}`]: type === 'flex' && align != null,
      })),
      updateClass(governor),
    )

    const style$ = this.gutter$.pipe(
      map((gutter) => {
        const margin = gutter / -2
        if (margin !== 0) {
          return {
            'margin-left': `${margin}px`,
            'margin-right': `${margin}px`,
          }
        } else {
          return {} as { [name: string]: string }
        }
      }),
      updateStyle(governor),
    )

    const status$ = merge(
      className$,
      style$,
    ).pipe(
      takeUntil(this.onDestroy$),
    )

    status$.subscribe()
  }

  ngOnChanges(changes: SimpleChanges): void { this.onChanges$.next(changes) }
  ngOnInit(): void { this.onInit$.next() }
  ngOnDestroy(): void { this.onDestroy$.next() }
}
