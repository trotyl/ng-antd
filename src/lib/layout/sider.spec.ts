import { Component } from '@angular/core'
import { TestBed, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getStyle } from 'ng-antd/testing'
import { LayoutModule } from './layout.module'
import { Sider } from './sider'

describe('Column', () => {
  const colPrefix = 'ant-col'

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ LayoutModule ],
      declarations: [
        SiderWidthTest,
      ]
    }).compileComponents()
  }))

  it('should set gutter styles properly', async(() => {
    const fixture = TestBed.createComponent(SiderWidthTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Sider))
    expect(getStyle(cols[0])).toEqual({ 'width': '200px' })
    expect(getStyle(cols[1])).toEqual({ 'width': '100px' })
  }))

})

@Component({
  template: `
    <ant-layout>
      <ant-sider></ant-sider>
      <ant-sider [width]="100"></ant-sider>
    </ant-layout>
  `
})
class SiderWidthTest { }
