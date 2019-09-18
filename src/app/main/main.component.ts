import { Component, OnInit, ViewChild } from '@angular/core'
import { Menu } from 'ng-antd'

@Component({
  selector: 'site-main-wrapper',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class SiteMainWrapper implements OnInit {
  @ViewChild(Menu, { static: true }) menu: Menu

  // TODO: support mobile layout
  isMobile = false
  activeMenuItem = 'button'

  items = [
    { type: 'general', components: ['button', 'icon'] },
    { type: 'layout', components: ['grid', 'layout'] },
    { type: 'navigation', components: ['menu'] },
    { type: 'feedback', components: ['alert'] },
  ]

  ngOnInit(): void {
    // TODO(menu): add autoExpand support
    this.menu.open('components')
  }
}
