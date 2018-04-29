import { AfterContentInit, ContentChildren, Directive, OnDestroy, QueryList } from '@angular/core'
import { ISubscription } from 'rxjs/Subscription'
import { merge } from 'rxjs/observable/merge'
import { startWith } from 'rxjs/operators/startWith'
import { tap } from 'rxjs/operators/tap'
import { AsideElement } from '../elements/aside'
import { Element } from '../elements/element'
import { FooterElement } from '../elements/footer'
import { HeaderElement } from '../elements/header'
import { MainElement } from '../elements/main'
import { HostManagerFactory } from '../host-manager/host-manager'
import { Sider } from './sider'

const prefix = 'ant-layout'

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

  constructor(private hostFactory: HostManagerFactory) { }

  ngAfterContentInit(): void {
    this.status$$ = merge(
      this.headers.changes.pipe(
        startWith(this.headers),
        tap(l => this.initElementClasses(l, `${prefix}-header`)),
      ),
      this.footers.changes.pipe(
        startWith(this.footers),
        tap(l => this.initElementClasses(l, `${prefix}-footer`)),
      ),
      this.mains.changes.pipe(
        startWith(this.mains),
        tap(l => this.initElementClasses(l, `${prefix}-content`)),
      ),
      this.asides.changes.pipe(
        startWith(this.asides),
        tap(l => this.initElementClasses(l, `${prefix}-sider`)),
      ),
    ).subscribe()
  }

  ngOnDestroy(): void {
    if (this.status$$) this.status$$.unsubscribe()
  }

  private initElementClasses(list: QueryList<Element>, className: string): void {
    list.filter(el => !this.marker.has(el)).forEach(el => {
      this.hostFactory.create(el.injector).addClass(className)
      this.marker.add(el)
    })
  }
}
