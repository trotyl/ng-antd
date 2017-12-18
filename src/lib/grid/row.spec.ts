import { Component } from '@angular/core'
import { TestBed, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import { Subscription } from 'rxjs/Subscription'
import { ScreenManager } from '../core/screen-manager'
import { getClassName, getStyle, noop } from '../testing/helper'
import { GridModule } from './grid.module'
import { Row } from './row'

describe('Row', () => {
  const rowPrefix = 'ant-row'

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GridModule ],
      declarations: [
        RowBasicTest,
        RowGutterStaticTest,
        RowGutterDynamicTest,
      ]
    }).compileComponents()
  }))

  it('should set basic classes properly', async(() => {
    const fixture = TestBed.createComponent(RowBasicTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.directive(Row))
    expect(getClassName(rows[0])).toBe(`${rowPrefix}`)
  }))

  it('should set gutter (static) styles properly', async(() => {
    const fixture = TestBed.createComponent(RowGutterStaticTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.directive(Row))
    expect(getStyle(rows[0])).toEqual({ 'marginLeft': '-8px', 'marginRight': '-8px' })
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
      expect(getStyle(rows[0])).toEqual({ 'marginLeft': '-8px', 'marginRight': '-8px' })
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

@Component({
  template: `
    <ant-row [gutter]="{ md: 16 }"></ant-row>
  `
})
class RowGutterDynamicTest { }
