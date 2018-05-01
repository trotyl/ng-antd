import { coerceBooleanProperty as boolify } from '@angular/cdk/coercion'
import { isDevMode, Directive, HostBinding, Input, OnChanges, OnInit, Optional, Self, SimpleChanges } from '@angular/core'
import { HostManager } from '../host-manager/host-manager'
import { assertExist } from '../util/debug'
import { Menu } from './menu'

const prefix = 'ant-menu-item'

@Directive({
  selector: '[antMenuItem]',
  exportAs: 'antMenuItem',
  host: {
    '[class.ant-menu-item-selected]': `selected`,
  },
  providers: [
    HostManager,
  ],
})
export class MenuItem implements OnChanges, OnInit {
  @Input() value: string
  @Input() disabled: boolean = false

  @HostBinding('attr.role') @Input() role: string = 'menuitem'

  @Input()
  set antMenuItem(value: string | '') {
    if (value !== '') { this.value = value }
  }

  get selected(): boolean {
    return this.value === this.menu.value
  }

  constructor(
    @Self() private host: HostManager,
    @Optional() private menu: Menu,
  ) { }

  ngOnInit(): void {
    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertExist(this.menu, `antMenuItem: must under 'antMenu'`)
    }

    this.host.staticClasses = [ prefix ]
    this.updateHostClasses()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  private updateHostClasses(): void {
    this.host.classes = {
      // TODO: track mouse hovering
      [`${prefix}-active`]: false,
      [`${prefix}-disabled`]: boolify(this.disabled),
    }
  }
}
