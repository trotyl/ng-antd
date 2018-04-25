import { Component } from '@angular/core'
import { TestBed, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import { Subscription } from 'rxjs/Subscription'
import { ScreenManager } from '../core/screen-manager'
import { getClassName, getStyle, noop } from 'ng-antd/testing'
import { GridModule } from './grid.module'
import { Row } from './row'

describe('Row', () => {
  const rowPrefix = 'ant-row'

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GridModule ],
      declarations: [
        RowTypeTest,
        RowGutterStaticTest,
        RowGutterDynamicTest,
        RowJustifyTest,
        RowAlignTest,
        RowAttributeSelectorTest,
      ]
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

  it('should set gutter (static) styles properly', async(() => {
    const fixture = TestBed.createComponent(RowGutterStaticTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.directive(Row))
    expect(getStyle(rows[0])).toEqual({ 'margin-left': '-8px', 'margin-right': '-8px' })
  }))

  describe('should set gutter (dynamic) styles properly', () => {
    let mockManager: ScreenManager
    let mockResolve$: Observable<any>
    let mockResolve$$: Subscription
    let resolveSpy: jasmine.Spy
    let unsubscribeSpy: jasmine.Spy

    beforeEach(() => {
      mockManager = { resolve: noop } as any
      mockResolve$ = { subscribe: noop } as any
      mockResolve$$ = { unsubscribe: noop } as any
      resolveSpy = spyOn(mockManager, 'resolve').and.returnValue(mockResolve$)
      unsubscribeSpy = spyOn(mockResolve$$, 'unsubscribe')
    })

    it('when matched', async(() => {
      spyOn(mockResolve$, 'subscribe').and.callFake((next: Function) => {
        next(16)
        return mockResolve$$
      })
      TestBed.overrideProvider(ScreenManager, { useValue: mockManager })

      const fixture = TestBed.createComponent(RowGutterDynamicTest)
      fixture.detectChanges()

      const rows = fixture.debugElement.queryAll(By.directive(Row))
      const rowDir = rows[0].injector.get(Row)
      expect(getStyle(rows[0])).toEqual({ 'margin-left': '-8px', 'margin-right': '-8px' })
      expect(rowDir.normalizedGutter).toBe(16)
      expect(resolveSpy).toHaveBeenCalledWith({ md: 16 })

      fixture.destroy()

      expect(unsubscribeSpy).toHaveBeenCalled()
    }))

    it('when not matched', async(() => {
      spyOn(mockResolve$, 'subscribe').and.callFake((next: Function) => {
        next(null)
        return mockResolve$$
      })
      TestBed.overrideProvider(ScreenManager, { useValue: mockManager })

      const fixture = TestBed.createComponent(RowGutterDynamicTest)
      fixture.detectChanges()

      const rows = fixture.debugElement.queryAll(By.directive(Row))
      const rowDir = rows[0].injector.get(Row)
      expect(getStyle(rows[0])).toEqual({})
      expect(rowDir.normalizedGutter).toBe(0)
      expect(resolveSpy).toHaveBeenCalledWith({ md: 16 })

      fixture.destroy()

      expect(unsubscribeSpy).toHaveBeenCalled()
    }))

  })

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
class RowGutterStaticTest { }

@Component({
  template: `
    <ant-row [gutter]="{ md: 16 }"></ant-row>
  `
})
class RowGutterDynamicTest { }

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
