import { NgModule, Type } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SourceViewer } from './source-viewer.component'

const TYPES: Type<any>[] = [
  SourceViewer,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule ],
  exports: [ TYPES ],
})
export class SharedModule { }
