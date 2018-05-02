import { AfterContentInit, ContentChildren, Directive, Inject, OnDestroy, QueryList } from '@angular/core'
import { ISubscription } from 'rxjs/Subscription'
import { merge } from 'rxjs/observable/merge'
import { startWith, tap } from 'rxjs/operators'
import { AsideElement } from '../elements/aside'
import { Element } from '../elements/element'
import { FooterElement } from '../elements/footer'
import { HeaderElement } from '../elements/header'
import { MainElement } from '../elements/main'
import { GovernorFactory } from '../governor/governor'
import { Sider } from './sider'
import { LAYOUT_PREFIX } from './token'


@Directive({
  selector: 'ant-layout, [antLayout]',
  host: {
    '[class.ant-layout]': `true`,
    '[class.ant-layout-has-sider]': `siders.length + asides.length > 0`,
  },
})
export class Layout implements AfterContentInit, OnDestroy {
  @ContentChildren(HeaderElement) headers: QueryList<Element>
  @ContentChildren(FooterElement) footers: QueryList<Element>
  @ContentChildren(MainElement) mains: QueryList<Element>
  @ContentChildren(AsideElement) asides: QueryList<Element>

  @ContentChildren(Sider) siders: QueryList<Sider>

  private marker: WeakSet<Element> = new WeakSet()
  private status$$: ISubscription | null = null

  constructor(
    @Inject(LAYOUT_PREFIX) private prefix: string,
    private governorFactory: GovernorFactory,
  ) { }

  ngAfterContentInit(): void {
    this.status$$ = merge(
      this.headers.changes.pipe(
        startWith(this.headers),
        tap(l => this.initElementClasses(l, `${this.prefix}-header`)),
      ),
      this.footers.changes.pipe(
        startWith(this.footers),
        tap(l => this.initElementClasses(l, `${this.prefix}-footer`)),
      ),
      this.mains.changes.pipe(
        startWith(this.mains),
        tap(l => this.initElementClasses(l, `${this.prefix}-content`)),
      ),
      this.asides.changes.pipe(
        startWith(this.asides),
        tap(l => this.initElementClasses(l, `${this.prefix}-sider`)),
      ),
    ).subscribe()
  }

  ngOnDestroy(): void {
    if (this.status$$) this.status$$.unsubscribe()
  }

  private initElementClasses(list: QueryList<Element>, className: string): void {
    list.filter(el => !this.marker.has(el)).forEach(el => {
      this.governorFactory.create(el.injector).addClass(className)
      this.marker.add(el)
    })
  }
}
