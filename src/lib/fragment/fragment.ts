import { Injectable, Injector, OnDestroy, OnInit, SkipSelf, TemplateRef, ViewContainerRef } from '@angular/core'
import { FragmentContainer } from './token'

@Injectable()
export abstract class Fragment implements OnDestroy, OnInit {
  abstract type: string

  constructor(
    public injector: Injector,
    public template: TemplateRef<void>,
    public viewContainer: ViewContainerRef,
    @SkipSelf() private container: FragmentContainer,
  ) { }

  ngOnInit(): void {
    this.container.register(this)
  }

  ngOnDestroy(): void {
    this.container.deregister(this)
    this.viewContainer.clear()
  }
}
