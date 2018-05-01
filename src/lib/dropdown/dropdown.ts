import { OriginConnectionPosition, Overlay, OverlayConnectionPosition, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { isDevMode, AfterContentInit, ContentChild, Directive, ElementRef, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core'
import { ISubscription } from 'rxjs/Subscription'
import { fromEvent } from 'rxjs/observable/fromEvent'
import { merge } from 'rxjs/observable/merge'
import { delay, filter, map, pairwise, scan, startWith } from 'rxjs/operators'
import { assertExist } from '../util/debug'
import { Overlay as AntOverlay } from './overlay'

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
export class Dropdown implements AfterContentInit, OnDestroy {
  @ContentChild(AntOverlay, { read: TemplateRef }) content: TemplateRef<void>

  portal: TemplatePortal
  outlet: OverlayRef

  private status$$: ISubscription | null = null

  constructor(
    private element: ElementRef,
    private vcRef: ViewContainerRef,
    private overlay: Overlay,
  ) {
    const positionStrategy = this.overlay.position().connectedTo(this.element, originPosition, overlayPosition)
    const scrollStrategy = this.overlay.scrollStrategies.reposition()
    this.outlet = this.overlay.create({ positionStrategy, scrollStrategy, panelClass })
  }

  ngAfterContentInit(): void {
    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertExist(this.content, `antDropdown: requires 'overlay'`)
    }
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
}
