import { Host, Injectable, Injector, OnDestroy, OnInit, Optional } from '@angular/core'
import { ElementContainer } from './token'

@Injectable()
export abstract class Element implements OnDestroy, OnInit {
  abstract tag: string

  constructor(
    public injector: Injector,
    @Optional() @Host() private container: ElementContainer,
  ) { }

  ngOnInit(): void {
    /* istanbul ignore next */
    if (this.container) {
      this.container.register(this)
    }
  }

  ngOnDestroy(): void {
    /* istanbul ignore next */
    if (this.container) {
      this.container.deregister(this)
    }
  }
}
