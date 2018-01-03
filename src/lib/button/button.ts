import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core'
import { NgClass } from '@angular/common'
import { boolify, exists, hasContent, getSizeToken, Classes, StyledControl, TypedChanges } from 'ng-antd/core'

const prefix = 'ant-btn'

@Component({
  selector: 'button[antBtn]',
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ NgClass ],
})
export class Button extends StyledControl {
  @Input() color: 'primary' | 'dashed' | 'danger' | 'default' = 'default'
  @Input() size: 'large' | 'small' | 'default' = 'default'
  @Input() icon: string | null = null
  @Input() shape: 'circle' | 'default' = 'default'

  @Input()
  set loading(value: boolean) { this._loading = boolify(value) }
  get loading(): boolean { return this._loading }

  @Input()
  set ghost(value: boolean) { this._ghost = boolify(value) }
  get ghost(): boolean { return this._ghost }

  @Input()
  set antBtn(value: 'primary' | 'dashed' | 'danger' | 'default' | '' | undefined) {
    if (value) { this.color = value }
  }

  @ViewChild('content')
  set content(value: ElementRef | undefined) {
    if (value) {
      const contentWrapper = value.nativeElement
      this._hasContent = hasContent(contentWrapper)
      this.forceUpdate()
    }
  }

  private _hasContent = true
  private _loading = false
  private _ghost = false

  ngOnUpdate(changes: TypedChanges<this>, firstChange: boolean): void {
    const shaped = exists(this.shape)
    this.hostClasses = {
      [`${prefix}`]: true,
      [`${prefix}-${this.color}`]: exists(this.color),
      [`${prefix}-${getSizeToken(this.size)}`]: exists(this.size),
      [`${prefix}-circle`]: shaped,
      [`${prefix}-icon-only`]: shaped || (exists(this.icon) && !this._hasContent),
      [`${prefix}-loading`]: this._loading,
      [`${prefix}-background-ghost`]: this._ghost,
    }
  }
}
