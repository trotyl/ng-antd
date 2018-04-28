import { TestBed, inject } from '@angular/core/testing'
import { BreakpointObserver } from '@angular/cdk/layout'
import { empty } from 'rxjs/observable/empty'
import { of } from 'rxjs/observable/of'
import { ResponsiveModule } from './responsive.module'
import { Responsive } from './responsive'

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

  it('should resolve to largest screen', inject([Responsive], (rsp: Responsive) => {
    let res: number
    rsp.resolve({ lg: 5, md: 2 }, () => 0, empty()).subscribe(x => res = x)

    expect(res!).toBe(5)
  }))

})
