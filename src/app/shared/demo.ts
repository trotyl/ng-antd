import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: '[demo]',
  templateUrl: './demo.html',
  host: {
    '[attr.id]': `'components-' + demo[0] + '-demo-' + demo[1]`,
    '[class.code-box]': `true`,
    '[class.expand]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo {
  @Input() demo: [string, string] = ['', '']
  @Input() title: string
}
