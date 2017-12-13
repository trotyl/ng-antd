import { OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { TypedChanges } from './lang'

export abstract class ReactiveControl implements OnChanges, OnInit {
  protected firstChange = true

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnUpdate(changes as any as TypedChanges<this>, this.firstChange)
    if (this.firstChange) { this.firstChange = false }
  }

  ngOnInit(): void {
    if (this.firstChange) {
      this.ngOnChanges({})
    }
  }

  abstract ngOnUpdate(changes: TypedChanges<this>, firstChange: boolean): void
}
