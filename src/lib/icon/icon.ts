import { coerceBooleanProperty as boolify } from '@angular/cdk/coercion'
import { isDevMode, Directive, Inject, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { HostManager } from '../host-manager/host-manager'
import { assertExist } from '../util/debug'
import { ICON_PREFIX } from './token'

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

  constructor(
    @Self() private host: HostManager,
    @Inject(ICON_PREFIX) private prefix: string,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  ngOnInit(): void {
    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertExist(this.type, `antIcon: requires 'type'`)
    }

    this.host.staticClasses = [ this.prefix ]
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${this.prefix}-${this.type}`]: !!this.type,
      [`${this.prefix}-spin`]: boolify(this.spin) || this.type === 'loading',
    }
  }
}
