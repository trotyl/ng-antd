import { ElementRef, Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { fromEvent } from 'rxjs/observable/fromEvent'
import { merge } from 'rxjs/observable/merge'
import { map } from 'rxjs/operators'

@Injectable()
export class Hover {
  changes: Observable<boolean>

  constructor(
    private el: ElementRef,
  ) {
    this.changes = merge(
      fromEvent(this.el.nativeElement, 'mouseenter').pipe(map(() => true)),
      fromEvent(this.el.nativeElement, 'mouseleave').pipe(map(() => false)),
    )
  }
}

@Injectable()
export class HoverFactory {
  create(injector: Injector): Hover {
    return new Hover(
      injector.get(ElementRef),
    )
  }
}
