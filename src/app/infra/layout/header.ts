import { Component } from '@angular/core'

@Component({
  selector: 'docs-header',
  templateUrl: './header.html',
})
export class DocsHeader {
  // TODO: support responsive
  isMobile = false

  get menuMode() {
    return this.isMobile ? 'inline' : 'horizontal'
  }
}
