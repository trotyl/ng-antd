import { NgModule } from '@angular/core'
import { SiteLayoutModule } from '@app/layout'
import { SiteSharedModule } from '@app/shared'
import { SiteHomeBannerImage } from './banner-image.component'
import { SiteHomeBanner } from './banner.component'
import { SiteHomePage1 } from './page1.component'
import { SiteHomePage2 } from './page2.component'
import { SiteHomePage3 } from './page3.component'
import { SiteHomeWrapper } from './wrapper.component'

const DECLARATIONS = [
  SiteHomeBanner,
  SiteHomeBannerImage,
  SiteHomePage1,
  SiteHomePage2,
  SiteHomePage3,
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
