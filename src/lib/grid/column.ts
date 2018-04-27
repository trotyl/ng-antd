import { Directive, Input, OnChanges, OnDestroy, Self, SimpleChanges } from '@angular/core'
import { NgClass, NgStyle } from '@angular/common'
import { ISubscription } from 'rxjs/Subscription'
import { tap } from 'rxjs/operators'
import { HostElement } from '../core/host-element'
import { ResponsiveOption as Rsp, Responsive } from '../responsive/responsive'
import { Row } from './row'

const prefix = 'ant-col'

@Directive({
  selector: 'ant-col, [antCol]',
  providers: [ NgClass, NgStyle, HostElement ],
})
export class Column implements OnChanges, OnDestroy {
  @Input() span: number = 0
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

  @Input('offset.xs') set offsetXs(value: number) { this.rOffset.xs = value }
  @Input('offset.sm') set offsetSm(value: number) { this.rOffset.sm = value }
  @Input('offset.md') set offsetMd(value: number) { this.rOffset.md = value }
  @Input('offset.lg') set offsetLg(value: number) { this.rOffset.lg = value }
  @Input('offset.xl') set offsetXl(value: number) { this.rOffset.xl = value }

  @Input('order.xs') set orderXs(value: number) { this.rOrder.xs = value }
  @Input('order.sm') set orderSm(value: number) { this.rOrder.sm = value }
  @Input('order.md') set orderMd(value: number) { this.rOrder.md = value }
  @Input('order.lg') set orderLg(value: number) { this.rOrder.lg = value }
  @Input('order.xl') set orderXl(value: number) { this.rOrder.xl = value }

  @Input('pull.xs') set pullXs(value: number) { this.rPull.xs = value }
  @Input('pull.sm') set pullSm(value: number) { this.rPull.sm = value }
  @Input('pull.md') set pullMd(value: number) { this.rPull.md = value }
  @Input('pull.lg') set pullLg(value: number) { this.rPull.lg = value }
  @Input('pull.xl') set pullXl(value: number) { this.rPull.xl = value }

  @Input('push.xs') set pushXs(value: number) { this.rPush.xs = value }
  @Input('push.sm') set pushSm(value: number) { this.rPush.sm = value }
  @Input('push.md') set pushMd(value: number) { this.rPush.md = value }
  @Input('push.lg') set pushLg(value: number) { this.rPush.lg = value }
  @Input('push.xl') set pushXl(value: number) { this.rPush.xl = value }

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

  private span$$: ISubscription | null = null
  private offset$$: ISubscription | null = null
  private order$$: ISubscription | null = null
  private pull$$: ISubscription | null = null
  private push$$: ISubscription | null = null

  constructor(
    @Self() private host: HostElement,
    private rsp: Responsive,
    private row: Row,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleSpanChange()
    this.handleOffsetChange()
    this.handleOrderChange()
    this.handlePullChange()
    this.handlePushChange()

    this.updateHostClasses()
    this.updateHostStyles()
  }

  ngOnDestroy(): void {
    if (this.span$$) this.span$$.unsubscribe()
    if (this.offset$$) this.offset$$.unsubscribe()
    if (this.order$$) this.order$$.unsubscribe()
    if (this.push$$) this.push$$.unsubscribe()
    if (this.pull$$) this.pull$$.unsubscribe()
  }

  private handleSpanChange(): void {
    if (!this.span$$ && Object.keys(this.rSpan).length > 0) {
      this.span$$ = this.rsp.resolve(this.rSpan, this.span)
        .pipe(tap(x => this.fSpan = x))
        .subscribe(() => this.updateHostClasses())
    } else {
      this.fSpan = this.span
    }
  }

  private handleOffsetChange(): void {
    if (!this.offset$$ && Object.keys(this.rOffset).length > 0) {
      this.offset$$ = this.rsp.resolve(this.rOffset, this.offset)
        .pipe(tap(x => this.fOffset = x))
        .subscribe(() => this.updateHostClasses())
    } else {
      this.fOffset = this.offset
    }
  }

  private handleOrderChange(): void {
    if (!this.order$$ && Object.keys(this.rOrder).length > 0) {
      this.order$$ = this.rsp.resolve(this.rOrder, this.order)
        .pipe(tap(x => this.fOrder = x))
        .subscribe(() => this.updateHostClasses())
    } else {
      this.fOrder = this.order
    }
  }

  private handlePullChange(): void {
    if (!this.pull$$ && Object.keys(this.rPull).length > 0) {
      this.pull$$ = this.rsp.resolve(this.rPull, this.pull)
        .pipe(tap(x => this.fPull = x))
        .subscribe(() => this.updateHostClasses())
    } else {
      this.fPull = this.pull
    }
  }

  private handlePushChange(): void {
    if (!this.push$$ && Object.keys(this.rPush).length > 0) {
      this.push$$ = this.rsp.resolve(this.rPush, this.push)
        .pipe(tap(x => this.fPush = x))
        .subscribe(() => this.updateHostClasses())
    } else {
      this.fPush = this.push
    }
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${prefix}`]: true,
      [`${prefix}-${this.fSpan}`]: true,
      [`${prefix}-offset-${this.fOffset}`]: this.fOffset > 0,
      [`${prefix}-pull-${this.fPull}`]: this.fPull > 0,
      [`${prefix}-push-${this.fPush}`]: this.fPush > 0,
      [`${prefix}-order-${this.fOrder}`]: this.fOrder > 0,
    }
  }

  private updateHostStyles(): void {
    const padding = this.row.gutter / 2
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
