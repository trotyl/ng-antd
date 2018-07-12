import { TitleCasePipe } from '@angular/common'
import { NgModule } from '@angular/core'
import { DocsSharedModule } from '../shared'
import { DocsMain } from './content/main'
import { DocsFooter } from './layout/footer'
import { DocsHeader } from './layout/header'

const TYPES = [
  DocsHeader,
  DocsFooter,
  DocsMain,
]

@NgModule({
  declarations: [TYPES],
  imports: [DocsSharedModule],
  exports: [TYPES],
  providers: [
    TitleCasePipe,
  ],
})
export class DocsInfraModule { }
