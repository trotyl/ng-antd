import { CommonModule } from '@angular/common'
import { NgModule, Type } from '@angular/core'
import { HightLight } from './highlight.directive'
import { SourceViewer } from './source-viewer.component'

const TYPES: Type<any>[] = [
  SourceViewer,
  HightLight,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule ],
  exports: [ TYPES ],
})
export class SharedModule { }
