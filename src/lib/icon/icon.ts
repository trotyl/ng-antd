import { coerceBooleanProperty as boolify } from '@angular/cdk/coercion'
import { Directive, Inject, Input, OnChanges, OnInit, Optional, Self, SimpleChanges } from '@angular/core'
import { Governor } from '../extension/governor'
import { assert } from '../util/debug'
import { ICON_PREFIX } from './token'

@Directive({
  selector: '[antIcon]',
})
export class Icon implements OnChanges, OnInit {
  @Input() type: string
  @Input() spin: boolean = false

  @Input()
  set antIcon(value: string) {
    if (value !== '') { this.type = value }
  }

  constructor(
    @Inject(ICON_PREFIX) private prefix: string,
    @Optional() @Self() private governor: Governor,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  ngOnInit(): void {
    /*@__PURE__*/assert(`antIcon: missing 'type' input`, !this.type)

    this.governor.configureStaticClasses([ this.prefix ])
  }

  private updateHostClasses(): void {
    this.governor.configureClasses({
      [`${this.prefix}-${this.type}`]: !!this.type,
      [`${this.prefix}-spin`]: boolify(this.spin) || this.type === 'loading',
    })
  }
}
