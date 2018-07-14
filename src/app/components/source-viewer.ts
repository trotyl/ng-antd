import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'source-viewer',
  templateUrl: './source-viewer.html',
  host: { '[style.display]': `'block'` },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSourceViewer {
  @Input() template: string
  @Input() clazz: string | null

  html: string
  ts: string
}
