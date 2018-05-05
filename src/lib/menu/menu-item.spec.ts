import { Component } from '@angular/core'
import { fakeAsync, tick, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { assertClass } from '../testing/helper'
import { MenuItem } from './menu-item'
import { MenuModule } from './menu.module'

describe('MenuItem', () => {
  const px = 'ant-menu-item'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, MenuModule ],
      declarations: [
        MenuItemStaticTest,
        MenuItemDisabledTest,
        MenuItemSelectedTest,
        MenuItemErrorMenuTest,
      ],
    }).compileComponents()
  })

  it('should set static classes properly', () => {
    const fixture = TestBed.createComponent(MenuItemStaticTest)
    fixture.detectChanges()

    const menus = fixture.debugElement.queryAll(By.directive(MenuItem))

    assertClass(menus[0], [`${px}`])
  })

  it('should set active classes properly', () => {
    const fixture = TestBed.createComponent(MenuItemStaticTest)
    fixture.detectChanges()

    const menu = fixture.debugElement.query(By.directive(MenuItem))
    menu.nativeElement.dispatchEvent(new CustomEvent('mouseenter'))

    assertClass(menu, [`${px}-active`])

    menu.nativeElement.dispatchEvent(new CustomEvent('mouseleave'))

    assertClass(menu, [], [`${px}-active`])
  })

  it('should set disabled classes properly', () => {
    const fixture = TestBed.createComponent(MenuItemDisabledTest)
    fixture.detectChanges()

    const menus = fixture.debugElement.queryAll(By.directive(MenuItem))

    assertClass(menus[0], [], [`${px}-disabled`])
    assertClass(menus[1], [`${px}-disabled`])
  })

  it('should set selected classes properly', fakeAsync(() => {
    const fixture = TestBed.createComponent(MenuItemSelectedTest)
    const component = fixture.componentInstance

    fixture.detectChanges()
    tick()

    const menus = fixture.debugElement.queryAll(By.directive(MenuItem))

    assertClass(menus[0], [`${px}-selected`])
    assertClass(menus[1], [], [`${px}-selected`])

    component.selected = 'bar'

    fixture.detectChanges()
    tick()

    assertClass(menus[0], [], [`${px}-selected`])
    assertClass(menus[1], [`${px}-selected`])
  }))

  it('should report error when not under menu', () => {
    const fixture = TestBed.createComponent(MenuItemErrorMenuTest)

    expect(() => fixture.detectChanges()).toThrowError(/antMenuItem: must under 'antMenu'/)
  })

})

@Component({
  template: `
    <ul antMenu>
      <li antMenuItem>Item</li>
    </ul>
  `,
})
class MenuItemStaticTest { }

@Component({
  template: `
    <ul antMenu>
      <li antMenuItem>Item</li>
      <li antMenuItem disabled>Item (Disabled)</li>
    </ul>
  `,
})
class MenuItemDisabledTest { }

@Component({
  template: `
    <ul antMenu [(ngModel)]="selected">
      <li antMenuItem="foo">Item Foo</li>
      <li antMenuItem="bar">Item Bar</li>
    </ul>
  `,
})
class MenuItemSelectedTest {
  selected = 'foo'
}

@Component({
  template: `
    <li antMenuItem="foo" disabled>Item Foo</li>
  `,
})
class MenuItemErrorMenuTest { }
