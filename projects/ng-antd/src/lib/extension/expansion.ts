import { OriginConnectionPosition, Overlay, OverlayConnectionPosition } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { AfterViewInit, Directive, ElementRef, Injectable, Injector, OnDestroy, TemplateRef, Type, ViewContainerRef } from '@angular/core'
import { combineLatest, fromEvent, merge, BehaviorSubject, Subject } from 'rxjs'
import { delay, filter, map, pairwise, scan, share, startWith, switchMap, takeUntil, tap } from 'rxjs/operators'

const originPos: OriginConnectionPosition = { originX: 'start', originY: 'bottom' }
const overlayPos: OverlayConnectionPosition = { overlayX: 'start', overlayY: 'top' }

@Directive({
  selector: '[antExtExpansion], [antDropdown], [antSubMenu]',
  exportAs: 'antExtExpansion',
})
export class Expansion implements AfterViewInit, OnDestroy {
  private afterViewInit$ = new Subject<void>()
  private onDestroy$ = new Subject<void>()
  private template$ = new BehaviorSubject<TemplateRef<void> | null>(null)

  constructor(
    el: ElementRef,
    vcRef: ViewContainerRef,
    overlay: Overlay,
  ) {
    // tslint:disable-next-line:deprecation
    const positionStrategy = overlay.position().connectedTo(el, originPos, overlayPos)
    const scrollStrategy = overlay.scrollStrategies.reposition()
    const outlet = overlay.create({ positionStrategy, scrollStrategy })

    const toggle$ = merge(
      fromEvent<void>(el.nativeElement, 'mouseenter').pipe(map(() => 1)),
      fromEvent<void>(el.nativeElement, 'mouseleave').pipe(delay(200), map(() => -1)),
      fromEvent<void>(outlet.overlayElement, 'mouseenter').pipe(map(() => 1)),
      fromEvent<void>(outlet.overlayElement, 'mouseleave').pipe(delay(200), map(() => -1)),
    ).pipe(
      scan((s, x) => s + x, 0),
      startWith(0),
      pairwise(),
      filter(([l, r]) => l * r <= 0),
      map(([l, r]) => r > 0),
    )

    const portal$ = this.template$.pipe(
      map(template => template ? new TemplatePortal(template, vcRef) : null),
      startWith(null as TemplatePortal | null),
      pairwise(),
      tap(([o]) => { if (o && o.isAttached) o.detach() }),
      map(([_, n]) => n),
    )

    const action$ = combineLatest(
      portal$,
      toggle$,
    ).pipe(
      filter(([p, t]) => p != null),
      tap(([p, t]) => {
        if (t) p!.attach(outlet)
        else p!.detach()
      }),
    )

    const changes$ = this.afterViewInit$.pipe(
      switchMap(() => action$),
    ).pipe(
      takeUntil(this.onDestroy$.pipe(
        tap(() => outlet.dispose()),
      )),
      share(),
    )

    changes$.subscribe()
  }

  ngAfterViewInit(): void { this.afterViewInit$.next() }
  ngOnDestroy(): void { this.onDestroy$.next() }

  configTemplate(template: TemplateRef<void> | null): void { this.template$.next(template) }
}

@Injectable({
  providedIn: 'root',
})
export class ExpansionFactory {
  create(injector: Injector): Expansion {
    return new Expansion(
      injector.get(ElementRef as Type<ElementRef>),
      injector.get(ViewContainerRef as Type<ViewContainerRef>),
      injector.get(Overlay),
    )
  }
}
