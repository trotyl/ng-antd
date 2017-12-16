import { Component } from '@angular/core'
import { TestBed, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Observer } from 'rxjs/Observer'
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

    const rows = fixture.debugElement.queryAll(By.css('ant-row'))
    expect(getClassName(rows[0])).toBe(`${rowPrefix}`)
  }))

  it('should set gutter (static) styles properly', async(() => {
    const fixture = TestBed.createComponent(RowGutterStaticTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.css('ant-row'))
    expect(getStyle(rows[0])).toEqual({ 'marginLeft': '-8px', 'marginRight': '-8px' })
  }))

  it('should set gutter (dynamic) styles properly', async(() => {
    const mockManager = { resolve: noop }
    const mockResolve$ = { subscribe: noop }
    const mockResolve$$ = { unsubscribe: noop }
    const resolveSpy = spyOn(mockManager, 'resolve').and.returnValue(mockResolve$)
    const unsubscribeSpy = spyOn(mockResolve$$, 'unsubscribe')
    spyOn(mockResolve$, 'subscribe').and.callFake((next: Function) => {
      next(16)
      return mockResolve$$
    })
    TestBed.overrideProvider(ScreenManager, { useValue: mockManager })

    const fixture = TestBed.createComponent(RowGutterDynamicTest)
    fixture.detectChanges()

    const rows = fixture.debugElement.queryAll(By.css('ant-row'))
    const rowDir = rows[0].injector.get(Row)
    expect(getStyle(rows[0])).toEqual({ 'marginLeft': '-8px', 'marginRight': '-8px' })
    expect(rowDir.normalizedGutter).toBe(16)
    expect(resolveSpy).toHaveBeenCalledWith({ md: 16 })

    fixture.destroy()

    expect(unsubscribeSpy).toHaveBeenCalled()
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

@Component({
  template: `
    <ant-row [gutter]="{ md: 16 }"></ant-row>
  `
})
class RowGutterDynamicTest { }
