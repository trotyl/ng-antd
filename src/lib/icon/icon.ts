import { isDevMode, Directive, Input, OnChanges, Self, SimpleChanges } from '@angular/core'
import { NgClass } from '@angular/common'
import { coerceBooleanProperty as boolify } from '@angular/cdk/coercion'
import { HostElement } from '../core/host-element'

const prefix = 'anticon'

@Directive({
  selector: '[antIcon]',
  providers: [ NgClass, HostElement ],
})
export class Icon implements OnChanges {
  @Input() type: string
  @Input() spin: boolean = false

  @Input()
  set antIcon(value: string) {
    if (value !== '') { this.type = value }
  }

  constructor(@Self() private host: HostElement) { }

  ngOnChanges(changes: SimpleChanges): void {
    /* istanbul ignore else */
    if (isDevMode()) this.checkNoConflits()
    this.updateHostClasses()
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${prefix}`]: true,
      [`${prefix}-${this.type}`]: !!this.type,
      [`${prefix}-spin`]: boolify(this.spin) || this.type === 'loading',
    }
  }

  private checkNoConflits(): void {
    if (!this.type) {
      throw new Error(`Antd: icon must have a type`)
    }
  }
}
