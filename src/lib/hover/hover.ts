import { AfterViewInit, Directive, ElementRef, Injectable, Injector, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { fromEvent } from 'rxjs/observable/fromEvent'
import { merge } from 'rxjs/observable/merge'
import { map, share, switchMap, takeUntil } from 'rxjs/operators'

@Directive({
  selector: '[antExtHover], [antMenuItem]',
  exportAs: 'antExtHover',
})
export class Hover implements AfterViewInit, OnDestroy {
  changes: Observable<boolean>

  private afterViewInit$ = new Subject<void>()
  private onDestroy$ = new Subject<void>()

  constructor(el: ElementRef) {
    this.changes = this.afterViewInit$.pipe(
      switchMap(() => merge(
        fromEvent(el.nativeElement, 'mouseenter').pipe(map(() => true)),
        fromEvent(el.nativeElement, 'mouseleave').pipe(map(() => false)),
      )),
    ).pipe(
      takeUntil(this.onDestroy$),
      share(),
    )

    this.changes.subscribe()
  }

  ngAfterViewInit(): void { this.afterViewInit$.next() }
  ngOnDestroy(): void { this.onDestroy$.next() }
}

@Injectable()
export class HoverFactory {
  create(injector: Injector): Hover {
    return new Hover(
      injector.get(ElementRef),
    )
  }
}
