import { Injectable, Injector, OnDestroy, OnInit, SkipSelf } from '@angular/core'
import { ElementContainer } from './token'

@Injectable()
export abstract class Element implements OnDestroy, OnInit {
  abstract tag: string

  constructor(
    public injector: Injector,
    @SkipSelf() private container: ElementContainer,
  ) { }

  ngOnInit(): void {
    this.container.register(this)
  }

  ngOnDestroy(): void {
    this.container.deregister(this)
  }
}
