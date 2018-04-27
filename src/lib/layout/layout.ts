import { AfterContentInit, ContentChildren, Directive, OnDestroy, QueryList } from '@angular/core'
import { ISubscription } from 'rxjs/Subscription'
import { merge } from 'rxjs/observable/merge'
import { startWith } from 'rxjs/operators/startWith'
import { tap } from 'rxjs/operators/tap'
import { FooterElement } from '../elements/footer'
import { HeaderElement } from '../elements/header'
import { MainElement } from '../elements/main'
import { AsideElement } from '../elements/aside'
import { Sider } from './sider'

const prefix = 'ant-layout'

@Directive({
  selector: 'ant-layout, [antLayout]',
  host: {
    '[class.ant-layout]': `true`,
    '[class.ant-layout-has-sider]': `siders.length + asides.length > 0`,
  }
})
export class Layout implements AfterContentInit, OnDestroy {
  @ContentChildren(HeaderElement) headers: QueryList<HeaderElement>
  @ContentChildren(FooterElement) footers: QueryList<FooterElement>
  @ContentChildren(MainElement) mains: QueryList<MainElement>
  @ContentChildren(AsideElement) asides: QueryList<AsideElement>

  @ContentChildren(Sider) siders: QueryList<Sider>

  private status$$: ISubscription

  ngAfterContentInit(): void {
    this.status$$ = merge(
      this.headers.changes.pipe(startWith([]), tap(() => this.initHeaderClasses())),
      this.footers.changes.pipe(startWith([]), tap(() => this.initFooterClasses())),
      this.mains.changes.pipe(startWith([]), tap((() => this.initMainClasses()))),
      this.asides.changes.pipe(startWith([]), tap(() => this.initAsideClasses())),
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.status$$.unsubscribe()
  }

  private initHeaderClasses(): void {
    this.headers.forEach(el => el.host.addClass(`${prefix}-header`))
  }

  private initFooterClasses(): void {
    this.footers.forEach(el => el.host.addClass(`${prefix}-footer`))
  }

  private initMainClasses(): void {
    this.mains.forEach(el => el.host.addClass(`${prefix}-content`))
  }

  private initAsideClasses(): void {
    this.asides.forEach(el => el.host.addClass(`${prefix}-sider`))
  }
}
