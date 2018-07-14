import { NgModule } from '@angular/core'
import { DocsSharedModule } from '../shared'
import { DocsContainer } from './container'
import { DocsDemoModule } from './demo.module'
import { DocsSourceViewer } from './source-viewer'

@NgModule({
  declarations: [ DocsContainer, DocsSourceViewer ],
  imports: [ DocsSharedModule, DocsDemoModule ],
})
export class DocsComponentsModule { }
