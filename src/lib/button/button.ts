import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, Self, SimpleChanges, ViewChild } from '@angular/core'
import { NgClass } from '@angular/common'
import { boolify, hasContent, getSizeToken } from '../core/index'
import { HostElement } from '../core/host-element'

const prefix = 'ant-btn'

@Component({
  selector: 'button[antBtn]',
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ NgClass, HostElement ],
})
export class Button implements OnChanges, OnInit {
  @Input() color: 'primary' | 'dashed' | 'danger' | null = null
  @Input() size: 'large' | 'small' | null = null
  @Input() icon: string | null = null
  @Input() shape: 'circle' | null = null

  @Input()
  set loading(value: boolean) { this._loading = boolify(value) }
  get loading(): boolean { return this._loading }

  @Input()
  set ghost(value: boolean) { this._ghost = boolify(value) }
  get ghost(): boolean { return this._ghost }

  @Input()
  set antBtn(value: 'primary' | 'dashed' | 'danger' | '' | null) {
    if (value !== '') { this.color = value }
  }

  @ViewChild('content')
  set content(value: ElementRef | undefined) {
    if (value) {
      const contentWrapper = value.nativeElement
      this._hasContent = hasContent(contentWrapper)
      this.updateHostClasses()
    }
  }

  private _hasContent = true
  private _loading = false
  private _ghost = false

  constructor(@Self() private host: HostElement) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  ngOnInit(): void {
    if (!this.host.classes) {
      this.updateHostClasses()
    }
  }

  private updateHostClasses(): void {
    this.host.classes = {
      [`${prefix}`]: true,
      [`${prefix}-${this.color}`]: !!this.color,
      [`${prefix}-${getSizeToken(this.size)}`]: !!this.size,
      [`${prefix}-circle`]: !!this.shape,
      [`${prefix}-icon-only`]: !!this.shape || (!!this.icon && !this._hasContent),
      [`${prefix}-loading`]: this._loading,
      [`${prefix}-background-ghost`]: this._ghost,
    }
  }
}
