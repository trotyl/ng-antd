import { Component } from '@angular/core'
import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getClassName, getStyle } from '../testing/helper'
import { GridModule } from './grid.module'

describe('Row', () => {
  const rowPrefix = 'ant-row'

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GridModule ],
      declarations: [
        RowBasicTest,
        RowGutterStaticTest,
      ]
    }).compileComponents()
  }))

  it('should set basic classes properly', async(() => {
    const fixture = TestBed.createComponent(RowBasicTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.css('ant-row'))
    expect(getClassName(rows[0])).toBe(`${rowPrefix}`)
  }))

  it('should set gutter (static) classes properly', async(() => {
    const fixture = TestBed.createComponent(RowGutterStaticTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.css('ant-row'))
    expect(getStyle(rows[0])).toEqual({ 'marginLeft': '-8px', 'marginRight': '-8px' })
  }))

})

@Component({
  template: `
    <ant-row></ant-row>
  `
})
class RowBasicTest { }

@Component({
  template: `
    <ant-row [gutter]="16"></ant-row>
  `
})
class RowGutterStaticTest { }
