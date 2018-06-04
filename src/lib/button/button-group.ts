import { Directive, Inject, Input, OnChanges, OnDestroy, Optional, Self, SimpleChanges } from '@angular/core'
/* tslint:disable-next-line:no-unused-variable */
import { Observable, Subject } from 'rxjs'
import { map, startWith, takeUntil } from 'rxjs/operators'
import { Governor } from '../extension/governor'
import { updateClass } from '../util/reactive'
import { BUTTON_GROUP_PREFIX } from './token'
import { toButtonSize } from './util'

@Directive({
  selector: 'ant-btn-group, [antBtnGroup]',
})
export class ButtonGroup implements OnChanges, OnDestroy {
  @Input() size: 'large' | 'small' | null

  @Input() set antBtnGroup(value: 'large' | 'small' | '' | null) { if (value !== '') this.size = value }

  onChanges$ = new Subject<SimpleChanges>()
  onDestroy$ = new Subject<void>()

  input$ = this.onChanges$.pipe(
    map(() => this),
    startWith(this),
  )

  constructor(
    @Inject(BUTTON_GROUP_PREFIX) prefix: string,
    @Optional() @Self() governor: Governor,
  ) {
    governor.configureStaticClasses([ prefix ])

    const className$ = this.input$.pipe(
      map(({ size }) => ({
        [`${prefix}-${toButtonSize(size)}`]: !!size,
      })),
      updateClass(governor),
    )

    const status$ = className$.pipe(
      takeUntil(this.onDestroy$),
    )

    status$.subscribe()
  }

  ngOnChanges(changes: SimpleChanges): void { this.onChanges$.next(changes) }
  ngOnDestroy(): void { this.onDestroy$.next() }
}
