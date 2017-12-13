import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core'
import { boolify } from '../core/lang'

@Component({
  selector: 'button[antBtn]',
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ant-btn]': `true`,
    '[class.ant-btn-primary]': `type === 'primary'`,
    '[class.ant-btn-dashed]': `type === 'dashed'`,
    '[class.ant-btn-danger]': `type === 'danger'`,
    '[class.ant-btn-lg]': `size === 'large'`,
    '[class.ant-btn-sm]': `size === 'small'`,
    '[class.ant-btn-circle]': `shape === 'circle'`,
    '[class.ant-btn-icon-only]': `shape === 'circle'`,
  },
})
export class Button {
  @Input() type: 'primary' | 'dashed' | 'danger' | 'default' = 'default'
  @Input() size: 'large' | 'small' | 'default' = 'default'
  @Input() icon: string | null = null
  @Input() shape: 'circle' | 'default' = 'default'

  @Input()
  @HostBinding('class.ant-btn-loading')
  set loading(value: boolean) { this._loading = boolify(value) }
  get loading(): boolean { return this._loading }

  @Input()
  @HostBinding('class.ant-btn-background-ghost')
  set ghost(value: boolean) { this._ghost = boolify(value) }
  get ghost(): boolean { return this._ghost }

  @Input()
  set antBtn(value: 'primary' | 'dashed' | 'danger' | 'default' | '' | undefined) {
    if (value) { this.type = value }
  }

  private _loading = false
  private _ghost = false
}
