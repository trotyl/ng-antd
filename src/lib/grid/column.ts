import { isDevMode, Directive, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { ISubscription } from 'rxjs/Subscription'
import { merge } from 'rxjs/observable/merge'
import { tap } from 'rxjs/operators'
import { HostManager } from '../host-manager/host-manager'
import { Responsive, ResponsiveOption as Rsp } from '../responsive/responsive'
import { assertExist, assertFalse, length } from '../util/debug'
import { Row } from './row'

const prefix = 'ant-col'

@Directive({
  selector: 'ant-col, [antCol]',
  providers: [ HostManager ],
})
export class Column implements OnChanges, OnDestroy, OnInit {
  @Input() span: number = -1
  @Input() offset: number = 0
  @Input() order: number = 0
  @Input() pull: number = 0
  @Input() push: number = 0

  @Input()
  set antCol(value: number | '') {
    if (value !== '') { this.span = value }
  }

  @Input('span.xs') set spanXs(value: number) { this.rSpan.xs = value }
  @Input('span.sm') set spanSm(value: number) { this.rSpan.sm = value }
  @Input('span.md') set spanMd(value: number) { this.rSpan.md = value }
  @Input('span.lg') set spanLg(value: number) { this.rSpan.lg = value }
  @Input('span.xl') set spanXl(value: number) { this.rSpan.xl = value }
  @Input('span.xxl') set spanXxl(value: number) { this.rSpan.xxl = value }

  @Input('offset.xs') set offsetXs(value: number) { this.rOffset.xs = value }
  @Input('offset.sm') set offsetSm(value: number) { this.rOffset.sm = value }
  @Input('offset.md') set offsetMd(value: number) { this.rOffset.md = value }
  @Input('offset.lg') set offsetLg(value: number) { this.rOffset.lg = value }
  @Input('offset.xl') set offsetXl(value: number) { this.rOffset.xl = value }
  @Input('offset.xxl') set offsetXxl(value: number) { this.rOffset.xxl = value }

  @Input('order.xs') set orderXs(value: number) { this.rOrder.xs = value }
  @Input('order.sm') set orderSm(value: number) { this.rOrder.sm = value }
  @Input('order.md') set orderMd(value: number) { this.rOrder.md = value }
  @Input('order.lg') set orderLg(value: number) { this.rOrder.lg = value }
  @Input('order.xl') set orderXl(value: number) { this.rOrder.xl = value }
  @Input('order.xxl') set orderXxl(value: number) { this.rOrder.xxl = value }

  @Input('pull.xs') set pullXs(value: number) { this.rPull.xs = value }
  @Input('pull.sm') set pullSm(value: number) { this.rPull.sm = value }
  @Input('pull.md') set pullMd(value: number) { this.rPull.md = value }
  @Input('pull.lg') set pullLg(value: number) { this.rPull.lg = value }
  @Input('pull.xl') set pullXl(value: number) { this.rPull.xl = value }
  @Input('pull.xxl') set pullXxl(value: number) { this.rPull.xxl = value }

  @Input('push.xs') set pushXs(value: number) { this.rPush.xs = value }
  @Input('push.sm') set pushSm(value: number) { this.rPush.sm = value }
  @Input('push.md') set pushMd(value: number) { this.rPush.md = value }
  @Input('push.lg') set pushLg(value: number) { this.rPush.lg = value }
  @Input('push.xl') set pushXl(value: number) { this.rPush.xl = value }
  @Input('push.xxl') set pushXxl(value: number) { this.rPush.xxl = value }

  rSpan: Rsp<number> = {}
  rOffset: Rsp<number> = {}
  rOrder: Rsp<number> = {}
  rPull: Rsp<number> = {}
  rPush: Rsp<number> = {}

  fSpan: number = 0
  fOffset: number = 0
  fOrder: number = 0
  fPull: number = 0
  fPush: number = 0

  private changes$ = new Subject<void>()

  private status$$: ISubscription
  private rowStatus$$: ISubscription

  constructor(
    @Self() private host: HostManager,
    private rsp: Responsive,
    @Optional() private row: Row,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.changes$.next()
  }

  ngOnInit(): void {
    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertExist(this.row, `antCol: must under 'antRow'`)
      /*@__PURE__*/assertFalse(this.span < 0 && /*@__PURE__*/length(this.rSpan) === 0, `antCol: requires 'span'`)
    }

    this.host.staticClasses = [prefix]

    this.rowStatus$$ = this.row.status$.subscribe(() => this.updateHostStyles())

    const span$ = this.rsp.resolve(this.rSpan, () => this.span, this.changes$)
    const offset$ = this.rsp.resolve(this.rOffset, () => this.offset, this.changes$)
    const order$ = this.rsp.resolve(this.rOrder, () => this.order, this.changes$)
    const pull$ = this.rsp.resolve(this.rPull, () => this.pull, this.changes$)
    const push$ = this.rsp.resolve(this.rPush, () => this.push, this.changes$)

    this.status$$ = merge(
      span$.pipe(tap(x => this.fSpan = x)),
      offset$.pipe(tap(x => this.fOffset = x)),
      order$.pipe(tap(x => this.fOrder = x)),
      pull$.pipe(tap(x => this.fPull = x)),
      push$.pipe(tap(x => this.fPush = x)),
    ).subscribe(() => this.updateHostClasses())
  }

  ngOnDestroy(): void {
    if (this.status$$) this.status$$.unsubscribe()
    if (this.rowStatus$$) this.rowStatus$$.unsubscribe()
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${prefix}-${this.fSpan}`]: true,
      [`${prefix}-offset-${this.fOffset}`]: this.fOffset > 0,
      [`${prefix}-pull-${this.fPull}`]: this.fPull > 0,
      [`${prefix}-push-${this.fPush}`]: this.fPush > 0,
      [`${prefix}-order-${this.fOrder}`]: this.fOrder > 0,
    }
  }

  private updateHostStyles(): void {
    const padding = this.row.fGutter / 2
    if (padding !== 0) {
      this.host.styles = {
        'padding-left': `${padding}px`,
        'padding-right': `${padding}px`,
      }
    } else {
      this.host.styles = { }
    }
  }
}
