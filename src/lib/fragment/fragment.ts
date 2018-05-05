import { Host, Injectable, Injector, OnDestroy, OnInit, Optional, TemplateRef, ViewContainerRef } from '@angular/core'
import { FragmentContainer } from './token'

@Injectable()
export abstract class Fragment implements OnDestroy, OnInit {
  abstract type: string

  constructor(
    public injector: Injector,
    public template: TemplateRef<void>,
    public viewContainer: ViewContainerRef,
    @Optional() @Host() private container: FragmentContainer,
  ) { }

  ngOnInit(): void {
    if (this.container) {
      this.container.register(this)
    }
  }

  ngOnDestroy(): void {
    if (this.container) {
      this.container.deregister(this)
    }
    this.viewContainer.clear()
  }
}
