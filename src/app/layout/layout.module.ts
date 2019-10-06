import { NgModule } from '@angular/core'
import { SiteSharedModule } from '@app/shared'
import { SiteFooter } from './footer.component'
import { SiteHeader } from './header.component'
import { SiteLayout } from './layout.component'

const DECLARATIONS = [
  SiteFooter,
  SiteHeader,
  SiteLayout,
]

@NgModule({
  declarations: [
    DECLARATIONS,
  ],
  imports: [
    SiteSharedModule,
  ],
  exports: [
    DECLARATIONS,
  ],
})
export class SiteLayoutModule {}
