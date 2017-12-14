import { ChangeDetectorRef, Directive, Input, Self } from '@angular/core'
import { NgClass, NgStyle } from '@angular/common'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { boolify, exists, ObjMap, TypedChanges } from '../core/lang'
import { StyledControl } from '../core/control'
import { ScreenManager, Breakpoint } from '../core/screen-manager'

const prefix = 'ant-row'

export interface GutterOptions {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}

@Directive({
  selector: 'ant-row',
  providers: [ NgClass, NgStyle ],
})
export class Row extends StyledControl {
  @Input() align: 'top' | 'middle' | 'bottom' = 'top'
  @Input() gutter: number | GutterOptions = 0
  @Input() justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between' = 'start'
  @Input() type: 'flex' | 'default' = 'default'

  get normalizedGutter(): number {
    return typeof this.gutter === 'number' ? this.gutter : this._gutter
  }

  private _gutter: number = 0
  private _gutter$$: Subscription


  constructor(
    private screenManager: ScreenManager,
    cdRef: ChangeDetectorRef,
    @Self() ngClass: NgClass,
    @Self() ngStyle: NgStyle,
  ) { super(cdRef, ngClass, ngStyle) }

  ngOnUpdate(changes: TypedChanges<this>, firstChange: boolean): void {
    if (typeof this.gutter !== 'number' && !this._gutter$$) {
      this._gutter$$ = this.screenManager.resolve(this.gutter as ObjMap<number>)
        .subscribe(val => this._gutter = val || 0)
    }

    if (firstChange) {
      this.hostClasses = {
        [`${prefix}`]: true,
      }
    }

    const margin = this.normalizedGutter / -2
    if (margin !== 0) {
      this.hostStyles = {
        'margin-left': `${margin}px`,
        'margin-right': `${margin}px`,
      }
    }
  }
}
