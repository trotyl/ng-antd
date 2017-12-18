import { Component } from '@angular/core'
import { TestBed, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getClassName, getStyle } from '../testing/helper'
import { GridModule } from './grid.module'
import { Row } from './row'
import { Column } from './column'

describe('Column', () => {
  const colPrefix = 'ant-col'

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GridModule ],
      declarations: [
        ColSpanTest,
        ColGutterTest,
        ColOffsetTest,
        ColPullTest,
        ColPushTest,
      ]
    }).compileComponents()
  }))

  it('should set span classes properly', async(() => {
    const fixture = TestBed.createComponent(ColSpanTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getClassName(cols[0])).toBe(`${colPrefix} ${colPrefix}-0`)
    expect(getClassName(cols[1])).toBe(`${colPrefix} ${colPrefix}-1`)
    expect(getClassName(cols[2])).toBe(`${colPrefix} ${colPrefix}-4`)
    expect(getClassName(cols[3])).toBe(`${colPrefix} ${colPrefix}-6`)
  }))

  it('should set gutter styles properly', async(() => {
    const fixture = TestBed.createComponent(ColGutterTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getStyle(cols[0])).toEqual({ 'paddingLeft': '8px', 'paddingRight': '8px' })
  }))

  it('should set offset classes properly', async(() => {
    const fixture = TestBed.createComponent(ColOffsetTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getClassName(cols[0])).toBe(`${colPrefix} ${colPrefix}-6 ${colPrefix}-offset-4`)
  }))

  it('should set pull classes properly', async(() => {
    const fixture = TestBed.createComponent(ColPullTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getClassName(cols[0])).toBe(`${colPrefix} ${colPrefix}-6 ${colPrefix}-pull-4`)
  }))

  it('should set push classes properly', async(() => {
    const fixture = TestBed.createComponent(ColPushTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getClassName(cols[0])).toBe(`${colPrefix} ${colPrefix}-6 ${colPrefix}-push-4`)
  }))

})

@Component({
  template: `
    <ant-row>
      <ant-col [span]="0"></ant-col>
      <ant-col [span]="1"></ant-col>
      <ant-col [span]="4"></ant-col>
      <ant-col [span]="6"></ant-col>
    </ant-row>
  `
})
class ColSpanTest { }

@Component({
  template: `
    <ant-col [span]="6"></ant-col>
  `,
  providers: [
    { provide: Row, useValue: { normalizedGutter: 16 }}
  ]
})
class ColGutterTest { }

@Component({
  template: `
    <ant-row>
      <ant-col [span]="6" [offset]="4"></ant-col>
    </ant-row>
  `
})
class ColOffsetTest { }

@Component({
  template: `
    <ant-row>
      <ant-col [span]="6" [pull]="4"></ant-col>
    </ant-row>
  `
})
class ColPullTest { }

@Component({
  template: `
    <ant-row>
      <ant-col [span]="6" [push]="4"></ant-col>
    </ant-row>
  `
})
class ColPushTest { }
