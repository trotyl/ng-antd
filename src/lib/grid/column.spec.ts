import { Component } from '@angular/core'
import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getClassName } from '../testing/helper'
import { GridModule } from './grid.module'

describe('Column', () => {
  const colPrefix = 'ant-col'

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GridModule ],
      declarations: [
        ColSpanTest,
      ]
    }).compileComponents()
  }))

  it('should set span classes properly', async(() => {
    const fixture = TestBed.createComponent(ColSpanTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.css('ant-col'))
    expect(getClassName(cols[0])).toBe(`${colPrefix} ${colPrefix}-0`)
    expect(getClassName(cols[1])).toBe(`${colPrefix} ${colPrefix}-1`)
    expect(getClassName(cols[2])).toBe(`${colPrefix} ${colPrefix}-4`)
    expect(getClassName(cols[3])).toBe(`${colPrefix} ${colPrefix}-6`)
  }))

})

@Component({
  template: `
    <ant-col [span]="0"></ant-col>
    <ant-col [span]="1"></ant-col>
    <ant-col [span]="4"></ant-col>
    <ant-col [span]="6"></ant-col>
  `
})
class ColSpanTest { }
