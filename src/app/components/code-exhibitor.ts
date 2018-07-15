import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'code[def]',
  templateUrl: './code-exhibitor.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsCodeExhibitor {
  @Input() def: CodeBlock
}
