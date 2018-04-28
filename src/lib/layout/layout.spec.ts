import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getClassName } from '../testing/helper'
import { LayoutModule } from './layout.module'
import { Layout } from './layout'

describe('Layout', () => {
  const layoutPrefix = 'ant-layout'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LayoutModule ],
      declarations: [
        LayoutSiderTest,
      ]
    }).compileComponents()
  })

  it('should set has-sider classes properly', () => {
    const fixture = TestBed.createComponent(LayoutSiderTest)
    fixture.detectChanges()

    const icons = fixture.debugElement.queryAll(By.directive(Layout))
    expect(getClassName(icons[0])).toBe(`${layoutPrefix}`)
    expect(getClassName(icons[1])).toBe(`${layoutPrefix} ${layoutPrefix}-has-sider`)
  })

})

@Component({
  template: `
    <ant-layout></ant-layout>
    <ant-layout>
      <ant-sider>Sider</ant-sider>
    </ant-layout>
  `
})
class LayoutSiderTest { }
