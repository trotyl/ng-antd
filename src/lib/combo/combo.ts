import { OriginConnectionPosition, Overlay, OverlayConnectionPosition, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { ElementRef, Injectable, Injector, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core'
import { ISubscription } from 'rxjs/Subscription'
import { fromEvent } from 'rxjs/observable/fromEvent'
import { merge } from 'rxjs/observable/merge'
import { delay, filter, map, pairwise, scan, startWith } from 'rxjs/operators'

const originPosition: OriginConnectionPosition = { originX: 'start', originY: 'bottom' }
const overlayPosition: OverlayConnectionPosition = { overlayX: 'start', overlayY: 'top' }

@Injectable()
export class Combo implements OnDestroy {
  outlet: OverlayRef
  portal: TemplatePortal

  private status$$: ISubscription

  constructor(
    private element: ElementRef,
    private vcRef: ViewContainerRef,
    private overlay: Overlay,
  ) { }

  ngOnDestroy(): void {
    /* istanbul ignore else */
    if (this.status$$) this.status$$.unsubscribe()
    /* istanbul ignore else */
    if (this.outlet) this.outlet.dispose()
  }

  init(template: TemplateRef<void>, panelClass?: string[]): void {
    const positionStrategy = this.overlay.position().connectedTo(this.element, originPosition, overlayPosition)
    const scrollStrategy = this.overlay.scrollStrategies.reposition()
    this.outlet = this.overlay.create({ positionStrategy, scrollStrategy, panelClass })
    this.portal = new TemplatePortal(template, this.vcRef)

    this.initListener()
  }

  private initListener(): void {
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
      if (res) {
        this.portal.attach(this.outlet)
      } else {
        this.portal.detach()
      }
    })
  }
}

@Injectable()
export class ComboFactory {
  create(injector: Injector): Combo {
    return new Combo(
      injector.get(ElementRef),
      injector.get(ViewContainerRef),
      injector.get(Overlay),
    )
  }
}
