import { ChangeDetectionStrategy, Directive, Input } from '@angular/core'

@Directive({
  selector: 'ant-btn-group',
  host: {
    '[class.ant-btn-group]': 'true',
    '[class.ant-btn-group-lg]': `size === 'large'`,
    '[class.ant-btn-group-sm]': `size === 'small'`,
  },
})
export class ButtonGroup {
  @Input() size: 'large' | 'small' | 'default' = 'default'
}
