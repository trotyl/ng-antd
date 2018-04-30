import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs/observable/of'
import { Responsive } from '../responsive/responsive'
import { assertClass, assertStyle } from '../testing/helper'
import { GridModule } from './grid.module'
import { Row } from './row'

describe('Row', () => {
  const px = 'ant-row'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        { provide: Responsive, useValue: { resolve: (opt: any, dg: any) => of(opt.md || dg()) } },
      ],
    }).compileComponents()
  })

  it('should set type classes properly', () => {
    const fixture = TestBed.createComponent(RowTypeTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.directive(Row))

    assertClass(rows[0], [`${px}`])
    assertClass(rows[1], [`${px}`])
    assertClass(rows[2], [`${px}-flex`])
  })

  it('should set gutter styles properly', () => {
    const fixture = TestBed.createComponent(RowGutterTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.directive(Row))

    assertStyle(rows[0], { 'margin-left': '-8px', 'margin-right': '-8px' })
  })

  it('should set gutter styles when responsive properly', () => {
    const fixture = TestBed.createComponent(RowGutterResponsiveTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.directive(Row))

    assertStyle(rows[0], { 'margin-left': '-12px', 'margin-right': '-12px' })
  })

  it('should set justify classes properly', () => {
    const fixture = TestBed.createComponent(RowJustifyTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.directive(Row))

    assertClass(rows[0], [], [`${px}-flex-start`, `${px}-flex-center`, `${px}-flex-end`, `${px}-flex-space-between`, `${px}-flex-space-around`])
    assertClass(rows[1], [`${px}-flex-start`])
    assertClass(rows[2], [`${px}-flex-center`])
    assertClass(rows[3], [`${px}-flex-end`])
    assertClass(rows[4], [`${px}-flex-space-between`])
    assertClass(rows[5], [`${px}-flex-space-around`])
  })

  it('should set align classes properly', () => {
    const fixture = TestBed.createComponent(RowAlignTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.directive(Row))

    assertClass(rows[0], [], [`${px}-flex-top`, `${px}-flex-middle`, `${px}-flex-bottom`])
    assertClass(rows[1], [`${px}-flex-top`])
    assertClass(rows[2], [`${px}-flex-middle`])
    assertClass(rows[3], [`${px}-flex-bottom`])
  })

  it('should support attribute selector usage', () => {
    const fixture = TestBed.createComponent(RowAttributeSelectorTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.directive(Row))

    assertClass(rows[0], [], [`${px}-flex`])
    assertClass(rows[1], [`${px}-flex`])
    assertClass(rows[2], [`${px}-flex`])
  })

})

@Component({
  template: `
    <ant-row></ant-row>
    <ant-row [type]="null"></ant-row>
    <ant-row type="flex"></ant-row>
  `,
})
class RowTypeTest { }

@Component({
  template: `
    <ant-row [gutter]="16"></ant-row>
  `,
})
class RowGutterTest { }

@Component({
  template: `
    <ant-row [gutter]="16" [gutter.md]="24"></ant-row>
  `,
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
  `,
})
class RowJustifyTest { }

@Component({
  template: `
    <ant-row type="flex"></ant-row>
    <ant-row type="flex" align="top"></ant-row>
    <ant-row type="flex" align="middle"></ant-row>
    <ant-row type="flex" align="bottom"></ant-row>
  `,
})
class RowAlignTest { }

@Component({
  template: `
    <div antRow></div>
    <div antRow type="flex"></div>
    <div antRow="flex"></div>
  `,
})
class RowAttributeSelectorTest { }
