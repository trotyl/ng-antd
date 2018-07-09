import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { demos } from '../../../tools/demo/result'

@Component({
  selector: 'source-viewer',
  templateUrl: './source-viewer.html',
  styles: [`
    .code-block {
      margin-top: 5px;
    }
  `],
  host: { '[style.display]': `'block'` },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSourceViewer implements OnInit {
  @Input() component: string
  @Input() case: string

  html: string
  ts: string

  ngOnInit(): void {
    this.html = demos[`${this.component}-${this.case}.html`]
    this.ts = demos[`${this.component}-${this.case}.ts`]
  }
}
