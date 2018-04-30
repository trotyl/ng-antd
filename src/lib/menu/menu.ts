import { forwardRef, Directive, HostBinding, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Subject } from 'rxjs/Subject'
import { noop, OnChangeFn, OnTouchedFn } from '../core/lang'
import { HostManager } from '../host-manager/host-manager'

const prefix = 'ant-menu'

@Directive({
  selector: '[antMenu]',
  exportAs: 'antMenu',
  providers: [
    HostManager,
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => Menu) },
  ],
})
export class Menu implements ControlValueAccessor, OnChanges, OnInit {
  @Input() mode: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline' = 'vertical'
  @Input() theme: 'light' | 'dark' = 'light'

  @HostBinding('attr.role') @Input() role: string = 'menu'
  @HostBinding('attr.tabindex') @Input() tabIndex: string = '0'

  @Input()
  set antMenu(value: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline' | '') {
    if (value !== '') { this.mode = value }
  }

  value: string | null = null

  status$: Subject<void>

  private onChangedFn: OnChangeFn<string> = noop
  private onTouchedFn: OnTouchedFn = noop

  constructor(@Self() private host: HostManager) { }

  ngOnInit(): void {
    this.host.staticClasses = [ prefix, `${prefix}-root` ]
    this.updateHostClasses()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  writeValue(value: string | null): void {
    if (value != null) {
      this.value = value
    }
  }

  registerOnChange(fn: any): void {
    this.onChangedFn = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn
  }

  setDisabledState(isDisabled: boolean): void {
    throw new Error('Method not implemented.')
  }

  updateByAction(value: string | null): void {
    this.value = value
    this.onChangedFn(value)
    this.onTouchedFn()
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${prefix}-${this.theme}`]: true,
      [`${prefix}-${this.mode}`]: true,
    }
  }
}
