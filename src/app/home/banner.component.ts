import { Component, HostBinding } from '@angular/core'

@Component({
  selector: 'site-home-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class SiteHomeBanner {
  @HostBinding('class.home-page-wrapper') homePageWrapper = true
  @HostBinding('class.banner-wrapper') bannerWrapper = true
}
