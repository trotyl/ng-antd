import { ChangeDetectorRef, Directive, Input, OnChanges, OnDestroy, OnInit, Self, SimpleChanges } from '@angular/core'
import { NgClass, NgStyle } from '@angular/common'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { coerceBooleanProperty as boolify } from '@angular/cdk/coercion'
import { Breakpoint, ResponsiveConfig, ScreenManager } from '../core/screen-manager'
import { HostElement } from '../core/host-element'

const prefix = 'ant-row'

@Directive({
  selector: 'ant-row, [antRow]',
  providers: [ NgClass, NgStyle, HostElement ],
})
export class Row implements OnChanges, OnDestroy, OnInit {
  @Input() align: 'top' | 'middle' | 'bottom' | null = null
  @Input() gutter: number | ResponsiveConfig<number> = 0
  @Input() justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | null = null
  @Input() type: 'flex' | null = null

  @Input()
  set antRow(value: 'flex' | '' | null) {
    if (value !== '') { this.type = value }
  }

  get normalizedGutter(): number {
    return typeof this.gutter === 'number' ? this.gutter : this._gutter
  }

  private _gutter: number = 0
  private _gutter$$: Subscription | null = null

  constructor(
    private screenManager: ScreenManager,
    @Self() private host: HostElement,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof this.gutter !== 'number' && !this._gutter$$) {
      this._gutter$$ = this.screenManager.resolve(this.gutter)
        .subscribe(val => this._gutter = val || 0)
    }

    this.updateHostClasses()
    this.updateHostStyles()
  }

  ngOnInit(): void {
    if (!this.host.classes) {
      this.updateHostClasses()
    }
  }

  ngOnDestroy(): void {
    if (this._gutter$$) {
      this._gutter$$.unsubscribe()
    }
  }

  private updateHostClasses(): void {
    const isFlex = this.type === 'flex'
    this.host.classes = {
      [`${prefix}`]: !isFlex,
      [`${prefix}-flex`]: isFlex,
      [`${prefix}-flex-${this.justify}`]: !!this.justify,
      [`${prefix}-flex-${this.align}`]: !!this.align,
    }
  }

  private updateHostStyles(): void {
    const margin = this.normalizedGutter / -2
    if (margin !== 0) {
      this.host.styles = {
        'margin-left': `${margin}px`,
        'margin-right': `${margin}px`,
      }
    } else {
      this.host.styles = { }
    }
  }
}
