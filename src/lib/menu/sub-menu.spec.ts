import { Component, ViewChild, ViewContainerRef } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { assertClass, assertStyle } from '../testing/helper'
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
        SubMenuInlineTest,
        SubMenuTitleTest,
        SubMenuErrorNoMenuTest,
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

    component.outlet.createEmbeddedView(component.subMenu.popUpTemplate)
    fixture.detectChanges()

    const popup = fixture.debugElement.query(By.css(`.${px}`))

    assertClass(popup, [`${px}-popup`, `${px}-light`])
  })

  it('should set open classes properly', () => {
    const fixture = TestBed.createComponent(SubMenuInlineTest)
    const subMenu = fixture.debugElement.query(By.directive(SubMenu))
    const instance = subMenu.componentInstance as SubMenu

    fixture.detectChanges()
    assertClass(subMenu, [], [`${px}-open`])

    instance.toggle()
    assertClass(subMenu, [`${px}-open`])
  })

  it('should set indent styles properly', () => {
    const fixture = TestBed.createComponent(SubMenuInlineTest)
    fixture.detectChanges()

    const title = fixture.debugElement.query(By.css(`.${px}-title`))

    assertStyle(title, { 'padding-left': '24px' })
  })

  it('should mount title properly', () => {
    const fixture = TestBed.createComponent(SubMenuTitleTest)
    fixture.detectChanges()

    const subMenus = fixture.debugElement.queryAll(By.directive(SubMenu))

    expect(subMenus[0].nativeElement.textContent).toContain(`Foo`)
    expect(subMenus[1].nativeElement.textContent).toContain(`Bar`)
  })

  it('should report error when not inside menu', () => {
    expect(() => TestBed.createComponent(SubMenuErrorNoMenuTest)).toThrowError(/antSubMenu: missing 'antMenu' in scope/)
  })

})

@Component({
  template: `
    <ul antMenu>
      <li antSubMenu="Key1"></li>
    </ul>
  `,
})
class SubMenuStaticTest { }

@Component({
  template: `
    <div #outlet></div>
    <ul antMenu>
      <li antSubMenu="Key1"></li>
    </ul>
  `,
})
class SubMenuPopupTest {
  @ViewChild('outlet', { read: ViewContainerRef }) outlet: ViewContainerRef
  @ViewChild(SubMenu) subMenu: SubMenu
}

@Component({
  template: `
    <ul antMenu="inline">
      <li antSubMenu="Key1"></li>
    </ul>
  `,
})
class SubMenuInlineTest { }

@Component({
  template: `
    <ul antMenu>
      <li antSubMenu title="Foo"></li>
      <li antSubMenu>
        <span>Bar</span>
      </li>
    </ul>
  `,
})
class SubMenuTitleTest { }

@Component({
  template: `
    <ul>
      <li antSubMenu="Key1"></li>
    </ul>
  `,
})
class SubMenuErrorNoMenuTest { }
