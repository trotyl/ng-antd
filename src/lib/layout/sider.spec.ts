import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { assertStyle } from '../testing/helper'
import { LayoutModule } from './layout.module'
import { Sider } from './sider'

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

    const cols = fixture.debugElement.queryAll(By.directive(Sider))

    assertStyle(cols[0], { 'width': '200px' })
    assertStyle(cols[1], { 'width': '100px' })
  })

  it('should support attribute selector usage', () => {
    const fixture = TestBed.createComponent(SiderAttributeSelectorTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Sider))

    assertStyle(cols[0], { 'width': '200px' })
    assertStyle(cols[1], { 'width': '100px' })
    assertStyle(cols[2], { 'width': '100px' })
  })

})

@Component({
  template: `
    <ant-layout>
      <ant-sider></ant-sider>
      <ant-sider [width]="100"></ant-sider>
    </ant-layout>
  `,
})
class SiderWidthTest { }

@Component({
  template: `
    <ant-layout>
      <div antSider></div>
      <div antSider [width]="100"></div>
      <div antSider="100"></div>
    </ant-layout>
  `,
})
class SiderAttributeSelectorTest { }