import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { assertStyle } from '../testing/helper'
import { LayoutModule } from './layout.module'
import { LayoutSider } from './sider'

describe('Column', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LayoutModule ],
      declarations: [
        SiderWidthTest,
        SiderAttributeSelectorTest,
      ],
    }).compileComponents()
  })

  it('should set gutter styles properly', () => {
    const fixture = TestBed.createComponent(SiderWidthTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(LayoutSider))

    assertStyle(cols[0], { 'width': '200px' })
    assertStyle(cols[1], { 'width': '100px' })
  })

  it('should support attribute selector usage', () => {
    const fixture = TestBed.createComponent(SiderAttributeSelectorTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(LayoutSider))

    assertStyle(cols[0], { 'width': '200px' })
    assertStyle(cols[1], { 'width': '100px' })
    assertStyle(cols[2], { 'width': '100px' })
  })

})

@Component({
  template: `
    <ant-layout>
      <ant-layout-sider></ant-layout-sider>
      <ant-layout-sider [width]="100"></ant-layout-sider>
    </ant-layout>
  `,
})
class SiderWidthTest { }

@Component({
  template: `
    <ant-layout>
      <div antLayoutSider></div>
      <div antLayoutSider [width]="100"></div>
      <div antLayoutSider="100"></div>
    </ant-layout>
  `,
})
class SiderAttributeSelectorTest { }
