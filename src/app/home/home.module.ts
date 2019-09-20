import { NgModule } from '@angular/core'
import { SiteLayoutModule } from '@app/layout'
import { SiteSharedModule } from '@app/shared'
import { SiteHomeBannerImage } from './banner-image.component'
import { SiteHomeBanner } from './banner.component'
import { SiteHomePage1 } from './page-1.component'
import { SiteHomeWrapper } from './wrapper.component'

const DECLARATIONS = [
  SiteHomeBanner,
  SiteHomeBannerImage,
  SiteHomePage1,
  SiteHomeWrapper,
]

@NgModule({
  declarations: [
    DECLARATIONS,
  ],
  imports: [
    SiteSharedModule,
    SiteLayoutModule,
  ],
})
export class SiteHomeModule {}
