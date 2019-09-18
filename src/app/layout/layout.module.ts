import { NgModule } from '@angular/core'
import { SiteSharedModule } from '@app/shared'
import { SiteFooter } from './footer.component'
import { SiteHeader } from './header.component'

const DECLARATIONS = [
  SiteFooter,
  SiteHeader,
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
