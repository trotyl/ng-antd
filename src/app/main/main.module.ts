import { NgModule } from '@angular/core'
import { DocsComponentsModule } from '@app/components'
import { SiteSharedModule } from '@app/shared'
import { SiteMainWrapper } from './main.component'

const DECLARATIONS = [
  SiteMainWrapper,
]

@NgModule({
  declarations: [
    DECLARATIONS,
  ],
  imports: [
    SiteSharedModule,
    DocsComponentsModule,
  ],
})
export class SiteMainModule {}
