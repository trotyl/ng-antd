import { Component, OnInit, ViewChild } from '@angular/core'
import { Menu } from 'ng-antd'

@Component({
  selector: 'docs-main',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class DocsMain implements OnInit {
  @ViewChild(Menu) menu: Menu

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
