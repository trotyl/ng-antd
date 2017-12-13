import { Injectable, Injector, SimpleChanges, StaticProvider } from '@angular/core'
import { NgClass } from '@angular/common'
import { Classes, TypedChanges } from './lang'

export type UpdateCallback<T> = (changes: TypedChanges<T>, firstChange: boolean) => void

export interface OnUpdate {
  ngOnUpdate: UpdateCallback<this>
}

export abstract class ReactiveControl implements OnUpdate {
  protected firstChange = true
  protected updateCallbacks: UpdateCallback<this>[] = [
    (changes, firstChange) => this.ngOnUpdate(changes, firstChange)
  ]

  private ngOnChanges(changes: SimpleChanges): void {
    for (const callback of this.updateCallbacks) {
      callback.call(this, changes, this.firstChange)
    }

    if (this.firstChange) { this.firstChange = false }
  }

  private ngOnInit(): void {
    if (this.firstChange) {
      this.ngOnChanges({})
    }
  }

  ngOnUpdate(changes: TypedChanges<this>, firstChange: boolean): void { }
}

@Injectable()
export abstract class StyledControl extends ReactiveControl {
  protected hostClasses: Classes = {}

  constructor(protected ngClass: NgClass) {
    super()

    this.updateCallbacks.push(() => this.updateHostClasses())
  }

  protected updateHostClasses(): void {
    this.ngClass.ngClass = this.hostClasses
    this.ngClass.ngDoCheck()
  }
}
