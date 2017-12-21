import { Component } from '@angular/core'
import { async, inject, TestBed } from '@angular/core/testing'
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Subject } from 'rxjs/Subject'
import { of } from 'rxjs/observable/of'
import { noop } from '../testing'
import { CoreModule } from './core.module'
import { Breakpoint, ScreenManager } from './screen-manager'

describe('ScreenManager', () => {
  let mockObserver: BreakpointObserver
  let observeSpy: jasmine.Spy
  let resMap: { [key: string]: Subject<BreakpointState> }

  beforeEach(() => {
    resMap = {}
    mockObserver = { observe: noop } as any
    observeSpy = spyOn(mockObserver, 'observe').and.callFake((query: string) => {
      resMap[query] = new Subject()
      return resMap[query]
    })
  })

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreModule ],
      providers: [
        { provide: BreakpointObserver, useValue: mockObserver }
      ]
    }).compileComponents()
  }))

  it('should subscribe to breakpoints change', inject([ScreenManager], (manager: ScreenManager) => {
    expect(observeSpy).toHaveBeenCalledWith('(min-width: 1600px)')
    expect(observeSpy).toHaveBeenCalledWith('(min-width: 1200px)')
    expect(observeSpy).toHaveBeenCalledWith('(min-width: 992px)')
    expect(observeSpy).toHaveBeenCalledWith('(min-width: 768px)')
    expect(observeSpy).toHaveBeenCalledWith('(min-width: 576px)')
    expect(observeSpy).toHaveBeenCalledWith('(max-width: 575px)')
  }))

  it('should expose current matched breakpoints', inject([ScreenManager], (manager: ScreenManager) => {
    let breakpoints: Breakpoint[] = []

    manager.breakpoints.subscribe(res => breakpoints = res)
    resMap['(min-width: 768px)'].next({ matches: true })

    expect(breakpoints).toEqual(['md'])
  }))

  it('should resolve value corresponding to matched breakpoints', inject([ScreenManager], (manager: ScreenManager) => {
    let res: number | null = 0

    manager.resolve({ lg: 10, md: 16, sm: 20 }).subscribe(x => res = x)
    resMap['(min-width: 768px)'].next({ matches: true })

    expect(res).toBe(16)
  }))

  it('should resolve to highest value when no match found', inject([ScreenManager], (manager: ScreenManager) => {
    let res: number | null = 0

    manager.resolve({ xl: 10, lg: 20 }).subscribe(x => res = x)
    resMap['(min-width: 768px)'].next({ matches: true })

    expect(res).toBe(10)
  }))

  it('should resolve to 0 when no value defined', inject([ScreenManager], (manager: ScreenManager) => {
    let res: number | null = null

    manager.resolve({} as { [key: string]: number }).subscribe(x => res = x)
    resMap['(min-width: 768px)'].next({ matches: true })

    expect(res).toBe(null)
  }))
})
