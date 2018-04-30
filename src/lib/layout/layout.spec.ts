import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { assertClass } from '../testing/helper'
import { Layout } from './layout'
import { LayoutModule } from './layout.module'

describe('Layout', () => {
  const px = 'ant-layout'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LayoutModule ],
      declarations: [
        LayoutStaticTest,
        LayoutSiderTest,
      ],
    }).compileComponents()
  })

  it('should set static classes properly', () => {
    const fixture = TestBed.createComponent(LayoutStaticTest)
    fixture.detectChanges()

    const icons = fixture.debugElement.queryAll(By.directive(Layout))

    assertClass(icons[0], [`${px}`])
  })

  it('should set has-sider classes properly', () => {
    const fixture = TestBed.createComponent(LayoutSiderTest)
    fixture.detectChanges()

    const icons = fixture.debugElement.queryAll(By.directive(Layout))

    assertClass(icons[0], [], [`${px}-has-sider`])
    assertClass(icons[1], [`${px}-has-sider`])
  })

})

@Component({
  template: `
    <ant-layout></ant-layout>
  `,
})
class LayoutStaticTest { }

@Component({
  template: `
    <ant-layout></ant-layout>
    <ant-layout>
      <ant-sider>Sider</ant-sider>
    </ant-layout>
  `,
})
class LayoutSiderTest { }
