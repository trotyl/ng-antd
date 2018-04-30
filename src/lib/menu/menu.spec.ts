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
      ],
    }).compileComponents()
  })

  it('should set static classes properly', () => {
    const fixture = TestBed.createComponent(MenuStaticTest)
    fixture.detectChanges()

    const menus = fixture.debugElement.queryAll(By.directive(Menu))

    assertClass(menus[0], [`${px}`, `${px}-root`])
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

})

@Component({
  template: `
    <ul antMenu></ul>
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
