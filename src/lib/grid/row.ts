import { ChangeDetectorRef, Directive, Input, OnDestroy, Self } from '@angular/core'
import { NgClass, NgStyle } from '@angular/common'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { boolify, exists, ObjMap, TypedChanges } from '../core/index'
import { StyledControl } from '../core/control'
import { Breakpoint, ResponsiveConfig, ScreenManager } from '../core/screen-manager'

const prefix = 'ant-row'

@Directive({
  selector: 'ant-row, [antRow]',
  providers: [ NgClass, NgStyle ],
})
export class Row extends StyledControl implements OnDestroy {
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
    cdRef: ChangeDetectorRef,
    @Self() ngClass: NgClass,
    @Self() ngStyle: NgStyle,
  ) { super(cdRef, ngClass, ngStyle) }

  ngOnUpdate(changes: TypedChanges<this>, firstChange: boolean): void {
    if (typeof this.gutter !== 'number' && !this._gutter$$) {
      this._gutter$$ = this.screenManager.resolve(this.gutter)
        .subscribe(val => this._gutter = val || 0)
    }

    const isFlex = this.type === 'flex'
    this.hostClasses = {
      [`${prefix}`]: !isFlex,
      [`${prefix}-flex`]: isFlex,
      [`${prefix}-flex-${this.justify}`]: exists(this.justify),
      [`${prefix}-flex-${this.align}`]: exists(this.align),
    }

    const margin = this.normalizedGutter / -2
    if (margin !== 0) {
      this.hostStyles = {
        'margin-left': `${margin}px`,
        'margin-right': `${margin}px`,
      }
    } else {
      this.hostStyles = { }
    }
  }

  ngOnDestroy(): void {
    if (this._gutter$$) {
      this._gutter$$.unsubscribe()
    }
  }
}
