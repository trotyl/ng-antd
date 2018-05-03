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
