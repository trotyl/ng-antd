import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { assertClass } from '../testing/helper'
import { Menu } from './menu'
import { MenuModule } from './menu.module'

describe('Menu', () => {
  const px = 'ant-menu'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MenuModule ],
      declarations: [
        MenuStaticTest,
        MenuModeTest,
        MenuThemeTest,
        MenuContentTest,
        MenuErrorNoGroupTest,
      ],
    }).compileComponents()
  })

  it('should set static classes properly', () => {
    const fixture = TestBed.createComponent(MenuStaticTest)
    fixture.detectChanges()

    const menu = fixture.debugElement.query(By.directive(Menu))
    const menuSub = menu.query(By.directive(Menu))

    assertClass(menu, [`${px}`, `${px}-root`])
    assertClass(menuSub, [`${px}`, `${px}-sub`])
  })

  it('should set mode classes properly', () => {
    const fixture = TestBed.createComponent(MenuModeTest)
    fixture.detectChanges()

    const menus = fixture.debugElement.queryAll(By.directive(Menu))

    assertClass(menus[0], [`${px}-vertical`])
    assertClass(menus[1], [`${px}-horizontal`])
    assertClass(menus[2], [`${px}-horizontal`])
  })

  it('should set theme classes properly', () => {
    const fixture = TestBed.createComponent(MenuThemeTest)
    fixture.detectChanges()

    const menus = fixture.debugElement.queryAll(By.directive(Menu))

    assertClass(menus[0], [`${px}-light`])
    assertClass(menus[1], [`${px}-dark`])
  })

  xit('should mount content', () => {
    const fixture = TestBed.createComponent(MenuContentTest)
    fixture.detectChanges()

    const menu = fixture.debugElement.query(By.directive(Menu))

    expect(menu.queryAll(By.css('li')).length).toBe(1)
  })

  it('should observe open and close changes', () => {
    const fixture = TestBed.createComponent(MenuStaticTest)
    fixture.detectChanges()

    const menu = fixture.debugElement.query(By.directive(Menu))
    const instance = menu.injector.get(Menu) as Menu

    instance.open('test')

    let res = false
    instance.observeKey('test').subscribe(x => res = x)
    expect(res).toBe(true)

    instance.close('test')
    expect(res).toBe(false)
  })

  xit('should report error when having content with no group', () => {
    const fixture = TestBed.createComponent(MenuErrorNoGroupTest)

    expect(() => fixture.detectChanges()).toThrowError(/antMenu: unexpected dangling 'antContent' with no 'antMenuItemGroup' found/)
  })

})

@Component({
  template: `
    <ul antMenu>
      <li>
        <ul antMenu></ul>
      </li>
    </ul>
  `,
})
class MenuStaticTest { }

@Component({
  template: `
    <ul antMenu></ul>
    <ul antMenu mode="horizontal"></ul>
    <ul antMenu="horizontal"></ul>
  `,
})
class MenuModeTest { }

@Component({
  template: `
    <ul antMenu></ul>
    <ul antMenu theme="dark"></ul>
  `,
})
class MenuThemeTest { }

@Component({
  template: `
    <ul antMenu>
      <ul *antContent antMenuItemGroup>Foo</ul>
    </ul>
  `,
})
class MenuContentTest { }

@Component({
  template: `
    <ul antMenu>
      <ul *antContent></ul>
    </ul>
  `,
})
class MenuErrorNoGroupTest { }
