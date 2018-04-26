import { isDevMode, ContentChild, Directive, ElementRef, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { OriginConnectionPosition, OverlayConnectionPosition, Overlay, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { Subscription } from 'rxjs/Subscription'
import { fromEvent } from 'rxjs/observable/fromEvent'
import { merge } from 'rxjs/observable/merge'
import { filter } from 'rxjs/operators/filter'
import { map } from 'rxjs/operators/map'
import { delay } from 'rxjs/operators/delay'
import { pairwise } from 'rxjs/operators/pairwise'
import { scan } from 'rxjs/operators/scan'
import { startWith } from 'rxjs/operators/startWith'
import { Overlay as OverlayDirective } from './overlay'

const originPosition: OriginConnectionPosition = { originX: 'start', originY: 'bottom' }
const overlayPosition: OverlayConnectionPosition = { overlayX: 'start', overlayY: 'top' }
const panelClass = ['ant-dropdown', 'ant-dropdown-placement-bottomLeft']

@Directive({
  selector: '[antDropdown]',
  host: {
    '[class.ant-dropdown-link]': `true`,
    '[class.ant-dropdown-trigger]': `true`,
  },
})
export class Dropdown implements OnDestroy, OnInit {
  @ContentChild(OverlayDirective, { read: TemplateRef }) content: TemplateRef<void>

  portal: TemplatePortal
  outlet: OverlayRef

  private status$$: Subscription | null = null

  constructor(
    private element: ElementRef,
    private vcRef: ViewContainerRef,
    private overlay: Overlay,
  ) {
    const positionStrategy = this.overlay.position().connectedTo(this.element, originPosition, overlayPosition)
    const scrollStrategy = this.overlay.scrollStrategies.reposition()
    this.outlet = this.overlay.create({ positionStrategy, scrollStrategy, panelClass })
  }

  ngOnInit(): void {
    if (isDevMode()) this.checkNoConflits()
    this.portal = new TemplatePortal(this.content, this.vcRef)
    this.initTrigger()
  }

  ngOnDestroy(): void {
    if (this.status$$) this.status$$.unsubscribe()
  }

  private initTrigger(): void {
    const hostEnter$ = fromEvent<void>(this.element.nativeElement, 'mouseenter')
    const hostLeave$ = fromEvent<void>(this.element.nativeElement, 'mouseleave')
    const contentEnter$ = fromEvent<void>(this.outlet.overlayElement, 'mouseenter')
    const contentLeave$ = fromEvent<void>(this.outlet.overlayElement, 'mouseleave')

    this.status$$ = merge(
      hostEnter$.pipe(map(() => 1)),
      hostLeave$.pipe(map(() => -1), delay(200)),
      contentEnter$.pipe(map(() => 1)),
      contentLeave$.pipe(map(() => -1), delay(200)),
    ).pipe(
      scan((s, x) => s + x, 0),
      startWith(0),
      pairwise(),
      filter(([l, r]) => l * r <= 0),
      map(([l, r]) => r > 0),
    ).subscribe(res => {
      if (res) this.portal.attach(this.outlet)
      else this.portal.detach()
    })
  }

  private checkNoConflits(): void {
    if (!this.content) {
      throw new Error(`Antd: no overlay provided to dropdown`)
    }
  }
}
