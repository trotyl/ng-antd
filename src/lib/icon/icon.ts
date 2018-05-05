import { coerceBooleanProperty as boolify } from '@angular/cdk/coercion'
import { isDevMode, Directive, Inject, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { Governor } from '../governor/governor'
import { assertExist } from '../util/debug'
import { ICON_PREFIX } from './token'

@Directive({
  selector: '[antIcon]',
  providers: [ Governor ],
})
export class Icon implements OnChanges, OnInit {
  @Input() type: string
  @Input() spin: boolean = false

  @Input()
  set antIcon(value: string) {
    if (value !== '') { this.type = value }
  }

  constructor(
    @Self() private governor: Governor,
    @Inject(ICON_PREFIX) private prefix: string,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  ngOnInit(): void {
    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertExist(this.type, `antIcon: missing 'type' input`)
    }

    this.governor.staticClasses = [ this.prefix ]
  }

  private updateHostClasses(): void {
    this.governor.classes = {
      [`${this.prefix}-${this.type}`]: !!this.type,
      [`${this.prefix}-spin`]: boolify(this.spin) || this.type === 'loading',
    }
  }
}
