import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { distinctUntilChanged, map, merge, startWith } from 'rxjs/operators'

export interface ResponsiveOption<T> {
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
}

const breakpoints: [keyof(ResponsiveOption<number>), string][] = [
  ['xl', '(min-width: 1200px)'],
  ['lg', '(min-width: 992px)'],
  ['md', '(min-width: 768px)'],
  ['sm', '(min-width: 576px)'],
  ['xs', '(max-width: 575px)'],
]

@Injectable()
export class Responsive {
  private observe$: Observable<BreakpointState>

  constructor(private observer: BreakpointObserver) {
    this.initObserver()
  }

  resolve<T>(option: ResponsiveOption<T>, defaultGetter: () => T, notifier: Observable<void>): Observable<T> {
    const find = () => breakpoints.find(([bp, qr]) => (bp in option) && this.observer.isMatched(qr))
    return this.observe$.pipe(
      merge(notifier),
      map(find),
      startWith(find()),
      map(res => res ? res[0] : null),
      map(bp => bp ? option[bp]! : defaultGetter()),
      distinctUntilChanged(),
    )
  }

  private initObserver(): void {
    this.observe$ = this.observer.observe(breakpoints.map(([_, qr]) => qr))
  }
}
