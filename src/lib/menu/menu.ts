import { forwardRef, AfterViewInit, ChangeDetectionStrategy, Component, Host, HostBinding, Inject, Input, OnChanges, OnInit, Optional, Self, SimpleChanges, SkipSelf, TemplateRef, ViewChild } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { Governor } from '../extension/governor'
import { Fragment } from '../fragment/fragment'
import { FragmentContainer } from '../fragment/token'
import { KeyedCompositeControl } from '../util/control'
import { assert, notEmpty } from '../util/debug'
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
export class Menu extends KeyedCompositeControl<string, boolean> implements AfterViewInit, FragmentContainer, OnChanges, OnInit {
  @Input() mode: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline' = 'vertical'
  @Input() theme: 'light' | 'dark' = 'light'

  @HostBinding('attr.role') @Input() role: string = 'menu'
  @HostBinding('attr.tabindex') @Input() tabIndex: string = '0'

  @ViewChild('groupWrapper') groupWrapper: TemplateRef<{ template: TemplateRef<void> }>

  @Input()
  set antMenu(value: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline' | '') {
    if (value !== '') { this.mode = value }
  }

  level: number
  containers: TemplateOutlet[] = []

  get parentComposite(): Menu {
    return this.parent
  }

  constructor(
    @Inject(MENU_PREFIX) private prefix: string,
    @Optional() @Self() private governor: Governor,
    @Optional() @Host() @SkipSelf() private parent: Menu,
  ) {
    super()

    this.level = parent ? parent.level + 1 : 1
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  ngOnInit(): void {
    if (this.parent) {
      this.mode = resolveMode(this.parent.mode)
    }

    this.governor.configureStaticClasses([ this.prefix ])
    this.updateHostClasses()
  }

  ngAfterViewInit(): void {
    /*@__PURE__*/assert(`antMenu: unexpected dangling 'antContent' with no 'antMenuItemGroup' found`, notEmpty(this.containers))
  }

  register(fragment: Fragment): void {
    /* istanbul ignore else */
    if (fragment.type === 'antContent') {
      fragment.viewContainer.createEmbeddedView(this.groupWrapper, { template: fragment.template })
    }
  }

  deregister(fragment: Fragment): void { }

  open(...keys: string[]): void {
    for (const key of keys) {
      this.pendingKeyedChanges.set(key, true)
      this.flushKey(key)
    }
  }

  close(...keys: string[]): void {
    for (const key of keys) {
      this.pendingKeyedChanges.set(key, false)
      this.flushKey(key)
    }
  }

  private updateHostClasses(): void {
    this.governor.configureClasses({
      [`${this.prefix}-${this.theme}`]: !this.parent,
      [`${this.prefix}-${this.mode}`]: true,
      [`${this.prefix}-${this.parent ? 'sub' : 'root'}`]: true,
    })
  }
}

/* istanbul ignore next */
function resolveMode(parentMode: string): 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline' {
  switch (parentMode) {
    case 'inline':
      return 'inline'
    default:
      return 'vertical'
  }
}
