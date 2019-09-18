import { NgModule } from '@angular/core'
import { SiteLayoutModule } from '@app/layout'
import { SiteSharedModule } from '@app/shared'
import { SiteHomeBannerImage } from './banner-image.component'
import { SiteHomeBanner } from './banner.component'
import { SiteHomeWrapper } from './wrapper.component'

const DECLARATIONS = [
  SiteHomeBanner,
  SiteHomeBannerImage,
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
export class HomeModule {}
