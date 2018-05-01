import { coerceBooleanProperty as boolify } from '@angular/cdk/coercion'
import { isDevMode, Directive, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { HostManager } from '../host-manager/host-manager'
import { assertExist } from '../util/debug'

const prefix = 'anticon'

@Directive({
  selector: '[antIcon]',
  providers: [ HostManager ],
})
export class Icon implements OnChanges, OnInit {
  @Input() type: string
  @Input() spin: boolean = false

  @Input()
  set antIcon(value: string) {
    if (value !== '') { this.type = value }
  }

  constructor(@Self() private host: HostManager) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  ngOnInit(): void {
    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertExist(this.type, `antIcon: requires 'type'`)
    }

    this.host.staticClasses = [ prefix ]
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${prefix}-${this.type}`]: !!this.type,
      [`${prefix}-spin`]: boolify(this.spin) || this.type === 'loading',
    }
  }
}
