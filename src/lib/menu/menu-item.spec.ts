import { Component } from '@angular/core'
import { fakeAsync, tick, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { assertClass, assertStyle } from '../testing/helper'
import { MenuItem } from './menu-item'
import { MenuModule } from './menu.module'

describe('MenuItem', () => {
  const px = 'ant-menu-item'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, MenuModule ],
      declarations: [
        MenuItemStaticTest,
        MenuItemIndentTest,
        MenuItemDisabledTest,
        MenuItemSelectedTest,
        MenuItemErrorNoMenuTest,
      ],
    }).compileComponents()
  })

  it('should set static classes properly', () => {
    const fixture = TestBed.createComponent(MenuItemStaticTest)
    fixture.detectChanges()

    const menuItems = fixture.debugElement.queryAll(By.directive(MenuItem))

    assertClass(menuItems[0], [`${px}`])
  })

  it('should set active classes properly', () => {
    const fixture = TestBed.createComponent(MenuItemStaticTest)
    fixture.detectChanges()

    const menuItem = fixture.debugElement.query(By.directive(MenuItem))
    menuItem.nativeElement.dispatchEvent(new CustomEvent('mouseenter'))

    assertClass(menuItem, [`${px}-active`])

    menuItem.nativeElement.dispatchEvent(new CustomEvent('mouseleave'))

    assertClass(menuItem, [], [`${px}-active`])
  })

  it('should set indent styles properly', () => {
    const fixture = TestBed.createComponent(MenuItemIndentTest)
    fixture.detectChanges()

    const menuItem = fixture.debugElement.query(By.directive(MenuItem))

    assertStyle(menuItem, { 'padding-left': '24px' })
  })

  it('should set disabled classes properly', () => {
    const fixture = TestBed.createComponent(MenuItemDisabledTest)
    fixture.detectChanges()

    const menuItems = fixture.debugElement.queryAll(By.directive(MenuItem))

    assertClass(menuItems[0], [], [`${px}-disabled`])
    assertClass(menuItems[1], [`${px}-disabled`])
  })

  it('should set selected classes properly', fakeAsync(() => {
    const fixture = TestBed.createComponent(MenuItemSelectedTest)
    const component = fixture.componentInstance

    fixture.detectChanges()
    tick()

    const menuItems = fixture.debugElement.queryAll(By.directive(MenuItem))

    assertClass(menuItems[0], [`${px}-selected`])
    assertClass(menuItems[1], [], [`${px}-selected`])

    component.selected = 'bar'

    fixture.detectChanges()
    tick()

    assertClass(menuItems[0], [], [`${px}-selected`])
    assertClass(menuItems[1], [`${px}-selected`])
  }))

  it('should report error when not under menu', () => {
    expect(() => TestBed.createComponent(MenuItemErrorNoMenuTest)).toThrowError(/antMenuItem: missing 'antMenu' in scope/)
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
    <ul antMenu="inline">
      <li antMenuItem>Item</li>
    </ul>
  `,
})
class MenuItemIndentTest { }

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
class MenuItemErrorNoMenuTest { }
