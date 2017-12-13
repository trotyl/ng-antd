import { Component } from '@angular/core'
import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getClassName } from '../testing/helper'
import { GridModule } from './grid.module'

describe('Row', () => {
  const rowPrefix = 'ant-row'

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GridModule ],
      declarations: [
        RowBasicTest,
      ]
    }).compileComponents()
  }))

  it('should set basic classes properly', async(() => {
    const fixture = TestBed.createComponent(RowBasicTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.css('ant-row'))
    expect(getClassName(rows[0])).toBe(`${rowPrefix}`)
  }))

})

@Component({
  template: `
    <ant-row></ant-row>
  `
})
class RowBasicTest { }
