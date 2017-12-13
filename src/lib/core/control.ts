import { OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { TypedChanges } from './lang'

export abstract class ReactiveControl implements OnChanges, OnInit {
  protected beforeChange = true

  ngOnChanges(changes: SimpleChanges): void {
    if (this.beforeChange) { this.beforeChange = false }
    this.ngOnUpdate(changes as any as TypedChanges<this>)
  }

  ngOnInit(): void {
    if (this.beforeChange) {
      this.ngOnChanges({})
    }
  }

  abstract ngOnUpdate(changes: TypedChanges<this>): void
}
