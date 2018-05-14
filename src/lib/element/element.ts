import { Host, Injectable, Injector, OnDestroy, OnInit, Optional } from '@angular/core'
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
