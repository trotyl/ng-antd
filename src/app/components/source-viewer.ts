import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'source-viewer',
  templateUrl: './source-viewer.html',
  host: { '[style.display]': `'block'` },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSourceViewer {
  @Input() template: CodeBlock
  @Input() clazz: string | null
}
