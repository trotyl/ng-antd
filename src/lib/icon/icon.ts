import { Directive, Input, OnChanges, Self, SimpleChanges } from '@angular/core'
import { NgClass } from '@angular/common'
import { boolify } from '../core/lang'
import { HostElement } from '../core/host-element'

const prefix = 'anticon'

@Directive({
  selector: 'i[antIcon]',
  providers: [ NgClass, HostElement ],
})
export class Icon {
  @Input() type: string

  @Input()
  set spin(value: boolean) { this._spin = boolify(value) }
  get spin(): boolean { return this._spin }

  @Input()
  set antIcon(value: string | undefined) {
    if (value) { this.type = value }
  }

  private _spin = false

  constructor(@Self() private host: HostElement) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${prefix}`]: true,
      [`${prefix}-${this.type}`]: !!this.type,
      [`${prefix}-spin`]: this._spin || this.type === 'loading',
    }
  }
}
