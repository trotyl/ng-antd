import { Styling } from '@angular-contrib/core'
import { Component, OnDestroy } from '@angular/core'

const styles = `
  .main-wrapper {
    padding: 0;
  }
  #header {
    box-shadow: none;
    max-width: 1200px;
    width: 100%;
    margin: 20px auto 0;
    padding: 0 24px;
  }
  #header,
  #header .ant-select-selection,
  #header .ant-menu {
    background: transparent;
  }
  #header #logo {
    padding: 0;
  }
  #header #nav .ant-menu-item {
    border-color: transparent;
  }
  #header #nav .ant-menu-submenu {
    border-color: transparent;
  }
  #header #nav .ant-menu-item.hide-in-home-page {
    display: none;
  }
  #header .ant-row > div:last-child .header-lang-button {
    margin-right: 0;
  }
  .rc-footer-container {
    max-width: 1200px;
    padding: 80px 0;
  }

  .rc-footer-bottom-container {
    max-width: 1200px;
  }

  .rc-footer-columns {
    justify-content: space-around;
  }
`

@Component({
  selector: 'site-home-wrapper',
  templateUrl: './wrapper.component.html',
})
export class SiteHomeWrapper implements OnDestroy {
  private disposeGlobalStyle!: () => void

  constructor(
    styling: Styling,
  ) {
    this.disposeGlobalStyle = styling.addGlobalStyle(styles)
  }

  ngOnDestroy(): void {
    this.disposeGlobalStyle()
  }
}
