import { NgModule } from '@angular/core'
import { SiteSharedModule } from '@app/shared'
import { SiteFooter } from './footer'
import { SiteHeader } from './header'
import { SiteMain } from './main'

const DECLARATIONS = [
  SiteFooter,
  SiteHeader,
  SiteMain,
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
