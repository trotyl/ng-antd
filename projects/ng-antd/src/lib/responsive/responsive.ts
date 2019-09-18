import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { distinctUntilChanged, map, startWith } from 'rxjs/operators'

export interface ResponsiveOption<T> {
  xs?: T | null
  sm?: T | null
  md?: T | null
  lg?: T | null
  xl?: T | null
  xxl?: T | null
  default: T
}

const breakpoints: [keyof(ResponsiveOption<number>), string][] = [
  ['xxl', '(min-width: 1600px)'],
  ['xl', '(min-width: 1200px)'],
  ['lg', '(min-width: 992px)'],
  ['md', '(min-width: 768px)'],
  ['sm', '(min-width: 576px)'],
  ['xs', '(max-width: 575px)'],
]

@Injectable({
  providedIn: 'root',
})
export class Responsive {
  private observe$: Observable<BreakpointState>

  constructor(private observer: BreakpointObserver) {
    this.initObserver()
  }

  resolve<T>(option: ResponsiveOption<T>): Observable<T> {
    const find = () => breakpoints.find(([bp, qr]) => (option[bp] != null) && this.observer.isMatched(qr))
    return this.observe$.pipe(
      map(find),
      startWith(find()),
      map(res => res ? res[0] : null),
      map(bp => bp ? option[bp]! : option.default),
      distinctUntilChanged(),
    )
  }

  private initObserver(): void {
    this.observe$ = this.observer.observe(breakpoints.map(([_, qr]) => qr))
  }
}
