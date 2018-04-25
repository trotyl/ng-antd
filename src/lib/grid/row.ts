import { ChangeDetectorRef, Directive, Input, OnChanges, OnDestroy, OnInit, Self, SimpleChanges } from '@angular/core'
import { NgClass, NgStyle } from '@angular/common'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { boolify, exists } from '../core/index'
import { Breakpoint, ResponsiveConfig, ScreenManager } from '../core/screen-manager'
import { HostElement } from '../core/host-element'

const prefix = 'ant-row'

@Directive({
  selector: 'ant-row, [antRow]',
  providers: [ NgClass, NgStyle, HostElement ],
})
export class Row implements OnChanges, OnDestroy, OnInit {
  @Input() align: 'top' | 'middle' | 'bottom' | 'default' = 'default'
  @Input() gutter: number | ResponsiveConfig<number> = 0
  @Input() justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'default' = 'default'
  @Input() type: 'flex' | 'default' = 'default'

  @Input()
  set antRow(value: 'flex' | 'default' | '' | undefined) {
    if (value) { this.type = value }
  }

  get normalizedGutter(): number {
    return typeof this.gutter === 'number' ? this.gutter : this._gutter
  }

  private _gutter: number = 0
  private _gutter$$: Subscription | null = null

  constructor(
    private screenManager: ScreenManager,
    @Self() private hostElement: HostElement,
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
    if (!this.hostElement.classes) {
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
    this.hostElement.classes = {
      [`${prefix}`]: !isFlex,
      [`${prefix}-flex`]: isFlex,
      [`${prefix}-flex-${this.justify}`]: exists(this.justify),
      [`${prefix}-flex-${this.align}`]: exists(this.align),
    }
  }

  private updateHostStyles(): void {
    const margin = this.normalizedGutter / -2
    if (margin !== 0) {
      this.hostElement.styles = {
        'margin-left': `${margin}px`,
        'margin-right': `${margin}px`,
      }
    } else {
      this.hostElement.styles = { }
    }
  }
}
