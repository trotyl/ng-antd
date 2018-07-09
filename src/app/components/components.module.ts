import { NgModule } from '@angular/core'
import { SharedModule } from '../shared'
import { DocsContainer } from './container'
import { DocsDemoModule } from './demo.module'
import { DocsHightLight } from './highlight'
import { DocsSourceViewer } from './source-viewer'

@NgModule({
  declarations: [ DocsContainer, DocsHightLight, DocsSourceViewer ],
  imports: [ SharedModule, DocsDemoModule ],
})
export class DocsComponentsModule { }
