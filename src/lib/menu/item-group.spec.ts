import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { assertClass } from '../testing/helper'
import { MenuItemGroup } from './item-group'
import { MenuModule } from './menu.module'

describe('MenuItemGroup', () => {
  const px = 'ant-menu-item-group-list'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MenuModule ],
      declarations: [
        MenuStaticTest,
      ],
    }).compileComponents()
  })

  it('should set static classes properly', () => {
    const fixture = TestBed.createComponent(MenuStaticTest)
    fixture.detectChanges()

    const menu = fixture.debugElement.query(By.directive(MenuItemGroup))

    assertClass(menu, [`${px}`])
  })

  it('should mount title content', () => {
    const fixture = TestBed.createComponent(MenuStaticTest)
    fixture.detectChanges()

    const title = fixture.debugElement.query(By.css('.ant-menu-item-group-title'))

    expect(title.nativeElement.textContent).toContain(`Title`)
  })

})

@Component({
  template: `
    <ul antMenu>
      <ul *antContent antMenuItemGroup title="Title"></ul>
    </ul>
  `,
})
class MenuStaticTest { }
