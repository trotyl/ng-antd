import { Directive, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { ISubscription } from 'rxjs/Subscription'
import { map, tap } from 'rxjs/operators'
import { Governor } from '../extension/governor'
import { Responsive, ResponsiveOption as Rsp } from '../responsive/responsive'
import { ROW_PREFIX } from './token'

@Directive({
  selector: 'ant-row, [antRow]',
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
  @Input('gutter.xxl') set gutterXxl(value: number) { this.rGutter.xxl = value }

  status$: Observable<void>
  status$$: ISubscription

  rGutter: Rsp<number> = {}
  fGutter: number = 0

  private changes$ = new Subject<void>()

  constructor(
    @Inject(ROW_PREFIX) private prefix: string,
    private rsp: Responsive,
    @Optional() @Self() private governor: Governor,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.changes$.next()
    this.updateHostClasses()
  }

  ngOnInit(): void {
    const gutter$ = this.rsp.resolve(this.rGutter, () => this.gutter, this.changes$)
    this.status$ = gutter$.pipe(tap(x => this.fGutter = x), map(() => {}))
    this.status$$ = this.status$.subscribe(() => this.updateHostStyles())

    this.updateHostClasses()
  }

  ngOnDestroy(): void {
    /* istanbul ignore else */
    if (this.status$$) this.status$$.unsubscribe()
  }

  private updateHostClasses(): void {
    const isFlex = this.type === 'flex'
    this.governor.configureClasses({
      [`${this.prefix}`]: !isFlex,
      [`${this.prefix}-flex`]: isFlex,
      [`${this.prefix}-flex-${this.justify}`]: !!this.justify,
      [`${this.prefix}-flex-${this.align}`]: !!this.align,
    })
  }

  private updateHostStyles(): void {
    const margin = this.fGutter / -2
    if (margin !== 0) {
      this.governor.configureStyles({
        'margin-left': `${margin}px`,
        'margin-right': `${margin}px`,
      })
    } else {
      this.governor.configureStyles({})
    }
  }
}
