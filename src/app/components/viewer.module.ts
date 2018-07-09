import { NgModule } from '@angular/core'
import { SharedModule } from '../shared'
import { DocsDemoModule } from './demo.module'
import { DocsHightLight } from './highlight'
import { DocsSourceViewer } from './source-viewer'
import { DocsViewer } from './viewer'

@NgModule({
  declarations: [ DocsViewer, DocsHightLight, DocsSourceViewer ],
  imports: [ SharedModule, DocsDemoModule ],
})
export class DocsViewerModule { }
