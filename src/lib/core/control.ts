import { ChangeDetectorRef, Injectable, Optional, Self, SimpleChanges } from '@angular/core'
import { NgClass, NgStyle } from '@angular/common'
import { Classes, Styles, TypedChanges } from './lang'

export type UpdateCallback<T> = (changes: TypedChanges<T>, firstChange: boolean) => void

export interface OnUpdate {
  ngOnUpdate: UpdateCallback<this>
}

@Injectable()
export abstract class ReactiveControl implements OnUpdate {
  protected firstChange = true
  protected updateCallbacks: UpdateCallback<this>[] = [
    (changes, firstChange) => this.ngOnUpdate(changes, firstChange)
  ]

  constructor(protected cdRef: ChangeDetectorRef) { }

  protected applyUpdate(changes: object = {}): void {
    for (const callback of this.updateCallbacks) {
      callback.call(this, changes, this.firstChange)
    }
  }

  protected forceUpdate(changes: object = {}): void {
    this.applyUpdate(changes)
    this.cdRef.detectChanges()
  }

  private ngOnChanges(changes: SimpleChanges): void {
    this.applyUpdate(changes)
    if (this.firstChange) { this.firstChange = false }
  }

  private ngOnInit(): void {
    if (this.firstChange) { this.ngOnChanges({}) }
  }

  ngOnUpdate(changes: TypedChanges<this>, firstChange: boolean): void { }
}

@Injectable()
export abstract class StyledControl extends ReactiveControl {
  protected hostClasses: Classes = {}
  protected hostStyles: Styles = {}

  constructor(
    cdRef: ChangeDetectorRef,
    @Self() @Optional() protected ngClass?: NgClass,
    @Self() @Optional() protected ngStyle?: NgStyle
  ) {
    super(cdRef)

    if (ngClass) {
      this.updateCallbacks.push(() => this.updateHostClasses())
    }
    if (ngStyle) {
      this.updateCallbacks.push(() => this.updateHostStyles())
    }
  }

  protected updateHostClasses(): void {
    this.ngClass!.ngClass = this.hostClasses
    this.ngClass!.ngDoCheck()
  }

  protected updateHostStyles(): void {
    this.ngStyle!.ngStyle = this.hostStyles
    this.ngStyle!.ngDoCheck()
  }
}
