import { CommonModule } from '@angular/common'
import { NgModule, Type } from '@angular/core'
import { Demo } from './demo'
import { HightLight } from './highlight'
import { SourceViewer } from './source-viewer.component'

const TYPES: Type<any>[] = [
  SourceViewer,
  HightLight,
  Demo,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule ],
  exports: [ TYPES ],
})
export class SharedModule { }
