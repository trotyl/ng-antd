import { Component, ViewChild, ViewContainerRef } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { assertClass } from '../testing/helper'
import { MenuModule } from './menu.module'
import { SubMenu } from './sub-menu'

describe('SubMenu', () => {
  const px = 'ant-menu-submenu'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MenuModule ],
      declarations: [
        SubMenuStaticTest,
        SubMenuPopupTest,
      ],
    }).compileComponents()
  })

  it('should set static classes properly', () => {
    const fixture = TestBed.createComponent(SubMenuStaticTest)
    fixture.detectChanges()

    const subMenu = fixture.debugElement.query(By.directive(SubMenu))
    const title = subMenu.query(By.css('div'))

    assertClass(subMenu, [`${px}`, `${px}-vertical`])
    assertClass(title, [`${px}-title`])
  })

  it('should set popup classes properly', () => {
    const fixture = TestBed.createComponent(SubMenuPopupTest)
    const component = fixture.componentInstance
    fixture.detectChanges()

    component.outlet.createEmbeddedView(component.subMenu.template)
    fixture.detectChanges()

    const popup = fixture.debugElement.query(By.css('.ant-menu-submenu'))

    assertClass(popup, [`${px}-popup`, `${px}-light`])
  })

})

@Component({
  template: `
    <ul antMenu>
      <li antSubMenu="Title"></li>
    </ul>
  `,
})
class SubMenuStaticTest { }

@Component({
  template: `
    <div #outlet></div>
    <ul antMenu>
      <li antSubMenu="Title"></li>
    </ul>
  `,
})
class SubMenuPopupTest {
  @ViewChild('outlet', { read: ViewContainerRef }) outlet: ViewContainerRef
  @ViewChild(SubMenu) subMenu: SubMenu
}
