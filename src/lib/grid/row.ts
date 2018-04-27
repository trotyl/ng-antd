import { Directive, Input, OnChanges, OnDestroy, OnInit, Self, SimpleChanges } from '@angular/core'
import { NgClass, NgStyle } from '@angular/common'
import { Observable } from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
import { ISubscription } from 'rxjs/Subscription'
import { tap, map } from 'rxjs/operators'
import { HostElement } from '../core/host-element'
import { ResponsiveOption as Rsp, Responsive } from '../responsive/responsive'

const prefix = 'ant-row'

@Directive({
  selector: 'ant-row, [antRow]',
  providers: [ NgClass, NgStyle, HostElement ],
})
export class Row implements OnChanges, OnDestroy, OnInit {
  @Input() align: 'top' | 'middle' | 'bottom' | null = null
  @Input() gutter: number = 0
  @Input() justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | null = null
  @Input() type: 'flex' | null = null

  @Input()
  set antRow(value: 'flex' | '' | null) {
    if (value !== '') { this.type = value }
  }

  @Input('gutter.xs') set gutterXs(value: number) { this.rGutter.xs = value }
  @Input('gutter.sm') set gutterSm(value: number) { this.rGutter.sm = value }
  @Input('gutter.md') set gutterMd(value: number) { this.rGutter.md = value }
  @Input('gutter.lg') set gutterLg(value: number) { this.rGutter.lg = value }
  @Input('gutter.xl') set gutterXl(value: number) { this.rGutter.xl = value }

  status$: Observable<void>
  status$$: ISubscription

  rGutter: Rsp<number> = {}
  fGutter: number = 0

  private changes$ = new Subject<void>()

  constructor(
    @Self() private host: HostElement,
    private rsp: Responsive,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.changes$.next()
    this.updateHostClasses()
  }

  ngOnInit(): void {
    const gutter$ = this.rsp.resolve(this.rGutter, () => this.gutter, this.changes$)
    this.status$ = gutter$.pipe(tap(x => this.fGutter = x), map(() => {}))
    this.status$$ = this.status$.subscribe(() => this.updateHostStyles())

    if (!this.host.classes) {
      this.updateHostClasses()
    }
  }

  ngOnDestroy(): void {
    if (this.status$$) this.status$$.unsubscribe()
  }

  private updateHostClasses(): void {
    const isFlex = this.type === 'flex'
    this.host.classes = {
      [`${prefix}`]: !isFlex,
      [`${prefix}-flex`]: isFlex,
      [`${prefix}-flex-${this.justify}`]: !!this.justify,
      [`${prefix}-flex-${this.align}`]: !!this.align,
    }
  }

  private updateHostStyles(): void {
    const margin = this.fGutter / -2
    if (margin !== 0) {
      this.host.styles = {
        'margin-left': `${margin}px`,
        'margin-right': `${margin}px`,
      }
    } else {
      this.host.styles = { }
    }
  }
}
