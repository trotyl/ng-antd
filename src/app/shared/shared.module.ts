import { NgModule, Type } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SourceViewer } from './source-viewer.component'
import { HightLight } from './highlight.directive'

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
