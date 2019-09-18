import { Directive, Host, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges } from '@angular/core'
/* tslint:disable-next-line:no-unused-variable */
import { combineLatest, merge, Observable, Subject } from 'rxjs'
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators'
import { Governor } from '../extension/governor'
import { Responsive } from '../responsive/responsive'
import { assert } from '../util/debug'
import { updateClass, updateStyle } from '../util/reactive'
import { Row } from './row'
import { COLUMN_PREFIX } from './token'

@Directive({
  selector: 'ant-col, [antCol]',
})
export class Column implements OnChanges, OnDestroy, OnInit {
  /**
   * raster number of cells to occupy, 0 corresponds to `display: none`
   */
  @Input() span: number | null = null

  /**
   * the number of cells to offset Col from the left
   */
  @Input() offset: number | null = null

  /**
   * raster order, used in `flex` layout mode
   */
  @Input() order: number | null = null

  /**
   * the number of cells that raster is moved to the left
   */
  @Input() pull: number | null = null

  /**
   * the number of cells that raster is moved to the right
   */
  @Input() push: number | null = null

  @Input() set antCol(value: number | '' | null) { if (value !== '') this.span = value }

  @Input('span.xs') spanXs: number | null = null
  @Input('span.sm') spanSm: number | null = null
  @Input('span.md') spanMd: number | null = null
  @Input('span.lg') spanLg: number | null = null
  @Input('span.xl') spanXl: number | null = null
  @Input('span.xxl') spanXxl: number | null = null

  @Input('offset.xs') offsetXs: number | null = null
  @Input('offset.sm') offsetSm: number | null = null
  @Input('offset.md') offsetMd: number | null = null
  @Input('offset.lg') offsetLg: number | null = null
  @Input('offset.xl') offsetXl: number | null = null
  @Input('offset.xxl') offsetXxl: number | null = null

  @Input('order.xs') orderXs: number | null = null
  @Input('order.sm') orderSm: number | null = null
  @Input('order.md') orderMd: number | null = null
  @Input('order.lg') orderLg: number | null = null
  @Input('order.xl') orderXl: number | null = null
  @Input('order.xxl') orderXxl: number | null = null

  @Input('pull.xs') pullXs: number | null = null
  @Input('pull.sm') pullSm: number | null = null
  @Input('pull.md') pullMd: number | null = null
  @Input('pull.lg') pullLg: number | null = null
  @Input('pull.xl') pullXl: number | null = null
  @Input('pull.xxl') pullXxl: number | null = null

  @Input('push.xs') pushXs: number | null = null
  @Input('push.sm') pushSm: number | null = null
  @Input('push.md') pushMd: number | null = null
  @Input('push.lg') pushLg: number | null = null
  @Input('push.xl') pushXl: number | null = null
  @Input('push.xxl') pushXxl: number | null = null

  onChanges$ = new Subject<SimpleChanges>()
  onInit$ = new Subject<void>()
  onDestroy$ = new Subject<void>()

  input$ = this.onChanges$.pipe(
    map(() => this),
    startWith(this),
  )

  constructor(
    @Inject(COLUMN_PREFIX) prefix: string,
    rsp: Responsive,
    @Optional() @Self() governor: Governor,
    @Optional() @Host() row: Row,
  ) {
    /*@__PURE__*/
    checkDeps(row)

    governor.configureStaticClasses([ prefix ])

    const rSpan$ = this.input$.pipe(map(({ span, spanXs: xs, spanSm: sm, spanMd: md, spanLg: lg, spanXl: xl, spanXxl: xxl }) => ({ xs, sm, md, lg, xl, xxl, default: span })))
    const rOffset$ = this.input$.pipe(map(({ offset, offsetXs: xs, offsetSm: sm, offsetMd: md, offsetLg: lg, offsetXl: xl, offsetXxl: xxl }) => ({ xs, sm, md, lg, xl, xxl, default: offset })))
    const rOrder$ = this.input$.pipe(map(({ order, orderXs: xs, orderSm: sm, orderMd: md, orderLg: lg, orderXl: xl, orderXxl: xxl }) => ({ xs, sm, md, lg, xl, xxl, default: order })))
    const rPull$ = this.input$.pipe(map(({ pull, pullXs: xs, pullSm: sm, pullMd: md, pullLg: lg, pullXl: xl, pullXxl: xxl }) => ({ xs, sm, md, lg, xl, xxl, default: pull })))
    const rPush$ = this.input$.pipe(map(({ push, pushXs: xs, pushSm: sm, pushMd: md, pushLg: lg, pushXl: xl, pushXxl: xxl }) => ({ xs, sm, md, lg, xl, xxl, default: push })))

    const responsive$ = combineLatest(
      rSpan$.pipe(switchMap(rSpan => rsp.resolve(rSpan))),
      rOffset$.pipe(switchMap(rOffset => rsp.resolve(rOffset))),
      rOrder$.pipe(switchMap(rOrder => rsp.resolve(rOrder))),
      rPull$.pipe(switchMap(rPull => rsp.resolve(rPull))),
      rPush$.pipe(switchMap(rPush => rsp.resolve(rPush))),
    ).pipe(
      map(([span, offset, order, pull, push]) => ({ span, offset, order, pull, push })),
    )

    const className$ = responsive$.pipe(
      map(({ span, offset, order, pull, push }) => ({
        [`${prefix}-${span}`]: true,
        [`${prefix}-offset-${offset}`]: offset != null,
        [`${prefix}-pull-${pull}`]: pull != null,
        [`${prefix}-push-${push}`]: push != null,
        [`${prefix}-order-${order}`]: order != null,
      })),
      updateClass(governor),
    )

    const style$ = row.gutter$.pipe(
      map((gutter) => {
        const padding = gutter / 2
        if (padding > 0) {
          return {
            'padding-left': `${padding}px`,
            'padding-right': `${padding}px`,
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

  ngOnChanges(changes: SimpleChanges): void { /*@__PURE__*/checkInputs(this); this.onChanges$.next(changes) }
  ngOnInit(): void { /*@__PURE__*/checkInputs(this); this.onInit$.next() }
  ngOnDestroy(): void { this.onDestroy$.next() }
}

function checkDeps(row: Row | null): void {
  assert(`antCol: missing 'antRow' in scope`, !row)
}

function checkInputs(ctx: Column): void {
  assert(`antCol: missing 'span' input`, ctx.antCol == null, ctx.span == null, ctx.spanXs == null, ctx.spanSm == null, ctx.spanMd == null, ctx.spanLg == null, ctx.spanXl == null, ctx.spanXxl == null)
}
