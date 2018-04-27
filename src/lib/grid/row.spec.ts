import { Component } from '@angular/core'
import { TestBed, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs/observable/of'
import { getClassName, getStyle } from '../testing/helper'
import { Responsive } from '../responsive/responsive'
import { GridModule } from './grid.module'
import { Row } from './row'

describe('Row', () => {
  const rowPrefix = 'ant-row'

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GridModule ],
      declarations: [
        RowTypeTest,
        RowGutterTest,
        RowGutterResponsiveTest,
        RowJustifyTest,
        RowAlignTest,
        RowAttributeSelectorTest,
      ],
      providers: [
        { provide: Responsive, useValue: { resolve: (opt: any, dv: any) => of(opt.md || dv) } }
      ],
    }).compileComponents()
  }))

  it('should set type classes properly', async(() => {
    const fixture = TestBed.createComponent(RowTypeTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.directive(Row))
    expect(getClassName(rows[0])).toBe(`${rowPrefix}`)
    expect(getClassName(rows[1])).toBe(`${rowPrefix}`)
    expect(getClassName(rows[2])).toBe(`${rowPrefix}-flex`)
  }))

  it('should set gutter styles properly', async(() => {
    const fixture = TestBed.createComponent(RowGutterTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.directive(Row))
    expect(getStyle(rows[0])).toEqual({ 'margin-left': '-8px', 'margin-right': '-8px' })
  }))

  it('should set gutter styles when responsive properly', async(() => {
    const fixture = TestBed.createComponent(RowGutterResponsiveTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.directive(Row))
    expect(getStyle(rows[0])).toEqual({ 'margin-left': '-12px', 'margin-right': '-12px' })
  }))

  it('should set justify classes properly', async(() => {
    const fixture = TestBed.createComponent(RowJustifyTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.directive(Row))
    expect(getClassName(rows[0])).toBe(`${rowPrefix}-flex`)
    expect(getClassName(rows[1])).toBe(`${rowPrefix}-flex ${rowPrefix}-flex-start`)
    expect(getClassName(rows[2])).toBe(`${rowPrefix}-flex ${rowPrefix}-flex-center`)
    expect(getClassName(rows[3])).toBe(`${rowPrefix}-flex ${rowPrefix}-flex-end`)
    expect(getClassName(rows[4])).toBe(`${rowPrefix}-flex ${rowPrefix}-flex-space-between`)
    expect(getClassName(rows[5])).toBe(`${rowPrefix}-flex ${rowPrefix}-flex-space-around`)
  }))

  it('should set align classes properly', async(() => {
    const fixture = TestBed.createComponent(RowAlignTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.directive(Row))
    expect(getClassName(rows[0])).toBe(`${rowPrefix}-flex`)
    expect(getClassName(rows[1])).toBe(`${rowPrefix}-flex ${rowPrefix}-flex-top`)
    expect(getClassName(rows[2])).toBe(`${rowPrefix}-flex ${rowPrefix}-flex-middle`)
    expect(getClassName(rows[3])).toBe(`${rowPrefix}-flex ${rowPrefix}-flex-bottom`)
  }))

  it('should support attribute selector usage', async(() => {
    const fixture = TestBed.createComponent(RowAttributeSelectorTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.directive(Row))
    expect(getClassName(rows[0])).toBe(`${rowPrefix}`)
    expect(getClassName(rows[1])).toBe(`${rowPrefix}-flex`)
    expect(getClassName(rows[2])).toBe(`${rowPrefix}-flex`)
  }))

})

@Component({
  template: `
    <ant-row></ant-row>
    <ant-row [type]="null"></ant-row>
    <ant-row type="flex"></ant-row>
  `
})
class RowTypeTest { }

@Component({
  template: `
    <ant-row [gutter]="16"></ant-row>
  `
})
class RowGutterTest { }

@Component({
  template: `
    <ant-row [gutter]="16" [gutter.md]="24"></ant-row>
  `
})
class RowGutterResponsiveTest { }

@Component({
  template: `
    <ant-row type="flex"></ant-row>
    <ant-row type="flex" justify="start"></ant-row>
    <ant-row type="flex" justify="center"></ant-row>
    <ant-row type="flex" justify="end"></ant-row>
    <ant-row type="flex" justify="space-between"></ant-row>
    <ant-row type="flex" justify="space-around"></ant-row>
  `
})
class RowJustifyTest { }

@Component({
  template: `
    <ant-row type="flex"></ant-row>
    <ant-row type="flex" align="top"></ant-row>
    <ant-row type="flex" align="middle"></ant-row>
    <ant-row type="flex" align="bottom"></ant-row>
  `
})
class RowAlignTest { }

@Component({
  template: `
    <div antRow></div>
    <div antRow type="flex"></div>
    <div antRow="flex"></div>
  `
})
class RowAttributeSelectorTest { }
