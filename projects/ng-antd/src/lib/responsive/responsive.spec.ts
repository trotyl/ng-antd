import { BreakpointObserver } from '@angular/cdk/layout'
import { inject, TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { Responsive } from './responsive'
import { ResponsiveModule } from './responsive.module'

describe('Responsive', () => {
  let mockObserver: BreakpointObserver

  beforeEach(() => {
    mockObserver = {
      observe: () => of(0),
      isMatched: () => true,
    } as any
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ResponsiveModule ],
      providers: [
        { provide: BreakpointObserver, useFactory: () => mockObserver },
      ],
    }).compileComponents()
  })

  it('should resolve to largest when matched', inject([Responsive], (rsp: Responsive) => {
    let res: number
    rsp.resolve({ lg: 5, md: 2, default: 0 }).subscribe(x => res = x)

    expect(res!).toBe(5)
  }))

  it('should resolve to default value when not matched', inject([Responsive], (rsp: Responsive) => {
    spyOn(mockObserver, 'isMatched').and.returnValue(false)

    let res: number
    rsp.resolve({ lg: 5, md: 2, default: 0 }).subscribe(x => res = x)

    expect(res!).toBe(0)
  }))

})
