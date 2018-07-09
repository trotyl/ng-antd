import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core'
import { Menu } from 'ng-antd'

/**
 * Vertical menu with inline submenus.
 *
 * @order 1
 * @title Inline menu
 */
@Component({
  selector: 'menu-demo-inline',
  templateUrl: './menu-demo-inline.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuDemoInline implements OnInit {
  @ViewChild(Menu) menu: Menu

  selected = '1'

  ngOnInit(): void {
    this.menu.open('sub1')
  }
}
