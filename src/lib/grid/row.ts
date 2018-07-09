import { Directive, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges } from '@angular/core'
import { merge, Observable, Subject } from 'rxjs'
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators'
import { Governor } from '../extension/governor'
import { Responsive } from '../responsive/responsive'
import { updateClass, updateStyle } from '../util/reactive'
import { ROW_PREFIX } from './token'

@Directive({
  selector: 'ant-row, [antRow]',
})
export class Row implements OnChanges, OnDestroy, OnInit {
  /**
   * the vertical alignment of the flex layout
   */
  @Input() align: 'top' | 'middle' | 'bottom' | null = null

  /**
   * spacing between grids
   */
  @Input() gutter: number = 0

  /**
   * horizontal arrangement of the flex layout
   */
  @Input() justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | null = null

  /**
   * layout mode
   */
  @Input() type: 'flex' | null = null

  @Input() set antRow(value: 'flex' | '' | null) { if (value !== '') this.type = value }

  @Input('gutter.xs') gutterXs: number | null = null
  @Input('gutter.sm') gutterSm: number | null = null
  @Input('gutter.md') gutterMd: number | null = null
  @Input('gutter.lg') gutterLg: number | null = null
  @Input('gutter.xl') gutterXl: number | null = null
  @Input('gutter.xxl') gutterXxl: number | null = null

  onChanges$ = new Subject<SimpleChanges>()
  onInit$ = new Subject<void>()
  onDestroy$ = new Subject<void>()

  input$ = this.onChanges$.pipe(
    map(() => this),
    startWith(this),
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
