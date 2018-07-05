import { Directive, Host, Injectable, Injector, OnDestroy, OnInit, Optional } from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'
import { ElementContainer } from './token'

@Injectable()
export abstract class Element implements OnDestroy, OnInit {
  abstract tag: string

  onInit$ = new Subject<void>()
  onDestroy$ = new Subject<void>()

  constructor(
    public injector: Injector,
    @Optional() @Host() container: ElementContainer,
  ) {
    const status$ = this.onInit$.pipe(
      tap(() => { if (container) container.register(this) }),
      takeUntil(this.onDestroy$.pipe(tap(() => { if (container) container.deregister(this) }))),
    )

    status$.subscribe()
  }

  ngOnInit(): void { this.onInit$.next() }
  ngOnDestroy(): void { this.onDestroy$.next() }
}

@Directive({
  selector: 'aside:not([antNoEffect])',
})
export class AsideElement extends Element {
  tag = 'aside'
}

@Directive({
  selector: 'footer:not([antNoEffect])',
})
export class FooterElement extends Element {
  tag = 'footer'
}

@Directive({
  selector: 'header:not([antNoEffect])',
})
export class HeaderElement extends Element {
  tag = 'header'
}

@Directive({
  selector: 'li:not([antNoEffect])',
})
export class LiElement extends Element {
  tag = 'li'
}

@Directive({
  selector: 'main:not([antNoEffect])',
})
export class MainElement extends Element {
  tag = 'main'
}
