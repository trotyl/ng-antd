import { forwardRef, isDevMode, AfterViewInit, ChangeDetectionStrategy, Component, Host, HostBinding, Inject, Input, OnChanges, OnInit, Optional, Self, SimpleChanges, SkipSelf, TemplateRef, ViewChild } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { Fragment } from '../fragment/fragment'
import { FragmentContainer } from '../fragment/token'
import { Governor } from '../governor/governor'
import { CompositeControl } from '../util/control'
import { assertTrue } from '../util/debug'
import { MENU_PREFIX, TemplateOutlet } from './token'


@Component({
  selector: '[antMenu]',
  templateUrl: './menu.html',
  exportAs: 'antMenu',
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => Menu) },
    { provide: FragmentContainer, useExisting: forwardRef(() => Menu) },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class Menu extends CompositeControl<string> implements AfterViewInit, FragmentContainer, OnChanges, OnInit {
  @Input() mode: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline' = 'vertical'
  @Input() theme: 'light' | 'dark' = 'light'

  @HostBinding('attr.role') @Input() role: string = 'menu'
  @HostBinding('attr.tabindex') @Input() tabIndex: string = '0'

  @ViewChild('groupWrapper') groupWrapper: TemplateRef<{ template: TemplateRef<void> }>

  @Input()
  set antMenu(value: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline' | '') {
    if (value !== '') { this.mode = value }
  }

  containers: TemplateOutlet[] = []

  constructor(
    @Inject(MENU_PREFIX) private prefix: string,
    @Optional() @Self() private governor: Governor,
    @Optional() @Host() @SkipSelf() private parent: Menu,
  ) {
    super()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  ngOnInit(): void {
    this.governor.configureStaticClasses([ this.prefix ])
    this.updateHostClasses()
  }

  ngAfterViewInit(): void {
    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertTrue(this.containers.length === 0, `antMenu: unexpected dangling 'antContent' with no 'antMenuItemGroup' found`)
    }
  }

  register(fragment: Fragment): void {
    /* istanbul ignore else */
    if (fragment.type === 'antContent') {
      fragment.viewContainer.createEmbeddedView(this.groupWrapper, { template: fragment.template })
    }
  }

  deregister(fragment: Fragment): void { }

  private updateHostClasses(): void {
    this.governor.configureClasses({
      [`${this.prefix}-${this.theme}`]: !this.parent,
      [`${this.prefix}-${this.mode}`]: true,
      [`${this.prefix}-${this.parent ? 'sub' : 'root'}`]: true,
    })
  }
}
