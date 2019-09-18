import { Component, HostBinding } from '@angular/core'

@Component({
  selector: 'footer[siteLayout]',
  templateUrl: './footer.html',
})
export class SiteFooter {
  @HostBinding('id') id = 'footer'
}
