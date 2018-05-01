import { forwardRef, Directive, HostBinding, Inject, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { HostManager } from '../host-manager/host-manager'
import { CompositeControl } from '../util/control'
import { MENU_PREFIX } from './token'


@Directive({
  selector: '[antMenu]',
  exportAs: 'antMenu',
  providers: [
    HostManager,
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => Menu) },
  ],
})
export class Menu extends CompositeControl<string> implements OnChanges, OnInit {
  @Input() mode: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline' = 'vertical'
  @Input() theme: 'light' | 'dark' = 'light'

  @HostBinding('attr.role') @Input() role: string = 'menu'
  @HostBinding('attr.tabindex') @Input() tabIndex: string = '0'

  @Input()
  set antMenu(value: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline' | '') {
    if (value !== '') { this.mode = value }
  }

  constructor(
    @Self() private host: HostManager,
    @Inject(MENU_PREFIX) private prefix: string,
  ) { super() }

  ngOnInit(): void {
    this.host.staticClasses = [ this.prefix, `${this.prefix}-root` ]
    this.updateHostClasses()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${this.prefix}-${this.theme}`]: true,
      [`${this.prefix}-${this.mode}`]: true,
    }
  }
}
