import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getClassName } from '../testing/helper'
import { Menu } from './menu'
import { MenuModule } from './menu.module'

describe('Menu', () => {
  const menuPrefix = 'ant-menu'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MenuModule ],
      declarations: [
        MenuModeTest,
        MenuThemeTest,
      ],
    }).compileComponents()
  })

  it('should set mode classes properly', () => {
    const fixture = TestBed.createComponent(MenuModeTest)
    fixture.detectChanges()

    const menus = fixture.debugElement.queryAll(By.directive(Menu))
    expect(getClassName(menus[0])).toBe(`${menuPrefix} ${menuPrefix}-light ${menuPrefix}-root ${menuPrefix}-vertical`)
    expect(getClassName(menus[1])).toBe(`${menuPrefix} ${menuPrefix}-horizontal ${menuPrefix}-light ${menuPrefix}-root`)
    expect(getClassName(menus[2])).toBe(`${menuPrefix} ${menuPrefix}-horizontal ${menuPrefix}-light ${menuPrefix}-root`)
  })

  it('should set theme classes properly', () => {
    const fixture = TestBed.createComponent(MenuThemeTest)
    fixture.detectChanges()

    const menus = fixture.debugElement.queryAll(By.directive(Menu))
    expect(getClassName(menus[0])).toBe(`${menuPrefix} ${menuPrefix}-light ${menuPrefix}-root ${menuPrefix}-vertical`)
    expect(getClassName(menus[1])).toBe(`${menuPrefix} ${menuPrefix}-dark ${menuPrefix}-root ${menuPrefix}-vertical`)
  })

})

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
