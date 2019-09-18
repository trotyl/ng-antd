import { Directive, Host, Injector, OnDestroy, OnInit, Optional, TemplateRef, ViewContainerRef } from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'
import { FragmentContainer } from './token'

@Directive({
  selector: 'ant-fragment',
})
export class Fragment implements OnDestroy, OnInit {
  type: string

  onInit$ = new Subject<void>()
  onDestroy$ = new Subject<void>()

  constructor(
    public injector: Injector,
    public template: TemplateRef<void>,
    public viewContainer: ViewContainerRef,
    @Optional() @Host() container: FragmentContainer,
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
