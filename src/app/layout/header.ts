import { Component, HostBinding } from '@angular/core'

@Component({
  selector: 'header[siteLayout]',
  templateUrl: './header.html',
})
export class SiteHeader {
  @HostBinding('id') id = 'header'
  @HostBinding('class.clearfix') clearfix = true

  // TODO: support responsive
  isMobile = false

  get menuMode() {
    return this.isMobile ? 'inline' : 'horizontal'
  }
}
