import { NgModule } from '@angular/core'
import { SiteSharedModule } from '../shared'
import { DocsCodeExhibitor } from './code-exhibitor'
import { DocsContainer } from './container'
import { DocsDemoModule } from './demo.module'
import { DocsSourceViewer } from './source-viewer'
import { DocsTokenTypePipe } from './token-type-pipe'

@NgModule({
  declarations: [ DocsCodeExhibitor, DocsContainer, DocsSourceViewer, DocsTokenTypePipe ],
  imports: [ SiteSharedModule, DocsDemoModule ],
})
export class DocsComponentsModule { }
