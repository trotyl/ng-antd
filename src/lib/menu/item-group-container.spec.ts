import { Component, TemplateRef, ViewChild } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { assertClass } from '../testing/helper'
import { MenuItemGroupContainer } from './item-group-container'
import { MenuModule } from './menu.module'

describe('MenuItemGroupContainer', () => {
  const px = 'ant-menu-item-group'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MenuModule ],
      declarations: [
        MenuItemGroupContainerStaticTest,
        MenuItemGroupContainerMountTest,
      ],
    }).compileComponents()
  })

  it('should set static classes properly', () => {
    const fixture = TestBed.createComponent(MenuItemGroupContainerStaticTest)
    fixture.detectChanges()

    const menu = fixture.debugElement.query(By.directive(MenuItemGroupContainer))
    const titleContainer = menu.query(By.css('div'))

    assertClass(menu, [`${px}`])
    assertClass(titleContainer, [`${px}-title`])
  })

  it('should support mount title', () => {
    const fixture = TestBed.createComponent(MenuItemGroupContainerMountTest)
    const component = fixture.componentInstance
    fixture.detectChanges()

    component.container.mount(component.title)

    const menu = fixture.debugElement.query(By.directive(MenuItemGroupContainer))
    const titleContainer = menu.query(By.css('div'))

    expect(titleContainer.nativeElement.textContent).toBe(`Title`)
  })

})

@Component({
  template: `
    <ul antMenu>
      <li [antMenuItemGroupContainer]="body"></li>
      <ng-template #body>Body</ng-template>
    </ul>
  `,
})
class MenuItemGroupContainerStaticTest { }

@Component({
  template: `
    <ul antMenu>
      <li [antMenuItemGroupContainer]="body"></li>
      <ng-template #body>Body</ng-template>
      <ng-template #title>Title</ng-template>
    </ul>
  `,
})
class MenuItemGroupContainerMountTest {
  @ViewChild(MenuItemGroupContainer) container: MenuItemGroupContainer
  @ViewChild('title') title: TemplateRef<void>
}
