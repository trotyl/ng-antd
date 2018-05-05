import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { assertClass } from '../testing/helper'
import { MenuItemGroup } from './item-group'
import { MenuItemGroupContainer } from './item-group-container'
import { MenuModule } from './menu.module'

describe('MenuItemGroup', () => {
  const px = 'ant-menu-item-group-list'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MenuModule ],
      declarations: [
        MenuStaticTest,
        MenuTitleTest,
        MenuErrorNoMenuTest,
        MenuErrorNoContentTest,
      ],
    }).compileComponents()
  })

  it('should set static classes properly', () => {
    const fixture = TestBed.createComponent(MenuStaticTest)
    fixture.detectChanges()

    const group = fixture.debugElement.query(By.directive(MenuItemGroup))

    assertClass(group, [`${px}`])
  })

  it('should mount title content', () => {
    const fixture = TestBed.createComponent(MenuTitleTest)
    fixture.detectChanges()

    const containers = fixture.debugElement.queryAll(By.directive(MenuItemGroupContainer))

    expect(containers[0].nativeElement.textContent).toContain(`Title`)
    expect(containers[1].nativeElement.textContent).toContain(`Title`)
  })

  it('should report error when not under menu', () => {
    const fixture = TestBed.createComponent(MenuErrorNoMenuTest)

    expect(() => fixture.detectChanges()).toThrowError(/antMenuItemGroup: missing 'antMenu' in scope/)
  })

  it('should report error when not with antContent', () => {
    const fixture = TestBed.createComponent(MenuErrorNoContentTest)

    expect(() => fixture.detectChanges()).toThrowError(/antMenuItemGroup: missing 'antContent' in scope/)
  })

})

@Component({
  template: `
    <ul antMenu>
      <ul *antContent antMenuItemGroup="foo"></ul>
    </ul>
  `,
})
class MenuStaticTest { }

@Component({
  template: `
    <ul antMenu>
      <ul *antContent antMenuItemGroup title="Title"></ul>
      <ul *antContent antMenuItemGroup>
        <span>Title</span>
      </ul>
    </ul>
  `,
})
class MenuTitleTest { }

@Component({
  template: `
    <ul antMenuItemGroup title="Title"></ul>
  `,
})
class MenuErrorNoMenuTest { }

@Component({
  template: `
    <ul antMenu>
      <ul *ngIf="true" antMenuItemGroup title="Title"></ul>
    </ul>
  `,
})
class MenuErrorNoContentTest { }
