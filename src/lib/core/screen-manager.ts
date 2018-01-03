import { Injectable } from '@angular/core'
import { BreakpointObserver } from '@angular/cdk/layout'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { combineLatest } from 'rxjs/observable/combineLatest'
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged'
import { map } from 'rxjs/operators/map'
import { startWith } from 'rxjs/operators/startWith'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type ResponsiveConfig<T> = {
  [key in Breakpoint]?: T
}

const breakpoints: Breakpoint[] = [ 'xxl', 'xl', 'lg', 'md', 'sm', 'xs' ]

const enum BreakpointToken {
  xs  = 0b00000001,
  sm  = 0b11111110,
  md  = 0b11111100,
  lg  = 0b11111000,
  xl  = 0b11110000,
  xxl = 0b11100000,
}

const enum BreakpointMatch {
  xs  = 0b00000001,
  sm  = 0b00000010,
  md  = 0b00000100,
  lg  = 0b00001000,
  xl  = 0b00010000,
  xxl = 0b00100000,
}

const queryMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
}

const tokenMap = {
  xs: BreakpointToken.xs,
  sm: BreakpointToken.sm,
  md: BreakpointToken.md,
  lg: BreakpointToken.lg,
  xl: BreakpointToken.xl,
  xxl: BreakpointToken.xxl,
}

const matchMap = {
  xs: BreakpointMatch.xs,
  sm: BreakpointMatch.sm,
  md: BreakpointMatch.md,
  lg: BreakpointMatch.lg,
  xl: BreakpointMatch.xl,
  xxl: BreakpointMatch.xxl,
}

@Injectable()
export class ScreenManager {
  breakpoints: Subject<Breakpoint[]> = new Subject()

  private match: Subject<BreakpointMatch> = new Subject()

  constructor(private observer: BreakpointObserver) {
    const querieObservables = breakpoints
      .map(breakpoint => this.makeQueryObservable(queryMap[breakpoint])
                             .pipe(
                               startWith(false),
                               map(matches => ({ breakpoint, matches })))
                             )

    combineLatest(...querieObservables)
      .pipe(
        map(list => this.generateMatch(list)),
        distinctUntilChanged(),
      )
      .subscribe(res => this.match.next(res))
  }

  resolve<T>(obj: ResponsiveConfig<T>): Observable<T | null> {
    return this.match.pipe(
      map((match) => {
        let firstDefined: Breakpoint | null = null
        for (const bp of breakpoints) {
          if (bp in obj) {
            if (!firstDefined) { firstDefined = bp }
            if (tokenMap[bp] & match) { return obj[bp]! }
          }
        }
        if (!firstDefined) { return null }
        return obj[firstDefined]!
      })
    )
  }

  private makeQueryObservable(query: string): Observable<boolean> {
    return this.observer.observe(query).pipe(
      map(state => state.matches)
    )
  }

  private generateMatch(list: Array<{ breakpoint: Breakpoint, matches: boolean }>): BreakpointMatch {
    const availableBreakpoints = list.filter(x => x.matches).map(x => x.breakpoint)
    this.breakpoints.next(availableBreakpoints)
    return matchMap[availableBreakpoints[0]]
  }
}
