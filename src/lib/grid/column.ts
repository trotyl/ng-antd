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

  rSpan: Rsp<number> = {}

  fSpan: number = 0

  private span$$: ISubscription | null = null

  constructor(
    @Self() private host: HostElement,
    private rsp: Responsive,
    private row: Row,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.span$$ && Object.keys(this.rSpan).length > 0) {
      this.span$$ = this.rsp.resolve(this.rSpan, this.span)
        .pipe(tap(x => this.fSpan = x))
        .subscribe(() => this.updateHostClasses())
    } else {
      this.fSpan = this.span
    }

    this.updateHostClasses()
    this.updateHostStyles()
  }

  ngOnDestroy(): void {
    if (this.span$$) this.span$$.unsubscribe()
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${prefix}`]: true,
      [`${prefix}-${this.fSpan}`]: true,
      [`${prefix}-offset-${this.offset}`]: this.offset > 0,
      [`${prefix}-pull-${this.pull}`]: this.pull > 0,
      [`${prefix}-push-${this.push}`]: this.push > 0,
      [`${prefix}-order-${this.order}`]: this.order > 0,
    }
  }

  private updateHostStyles(): void {
    const padding = this.row.gutter / 2
    this.host.styles = {
      'padding-left': `${padding}px`,
      'padding-right': `${padding}px`,
    }
  }
}
