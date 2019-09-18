import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnDestroy, Optional, Self, SimpleChanges } from '@angular/core'
/* tslint:disable-next-line:no-unused-variable */
import { Observable, Subject } from 'rxjs'
import { map, startWith, takeUntil } from 'rxjs/operators'
import { Governor } from '../extension/governor'
import { updateClass } from '../util/reactive'
import { ALERT_PREFIX } from './token'

@Component({
  selector: 'ant-alert, [antAlert]',
  templateUrl: './alert.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class Alert implements OnChanges, OnDestroy {
  /**
   * Type of Alert styles
   */
  @Input() type: string = 'info'

  /**
   * Content of Alert
   */
  @Input('message') message: string

  @Input() set antAlert(value: string) { if (value !== '') { this.type = value } }

  onChanges$ = new Subject<SimpleChanges>()
  onDestroy$ = new Subject<void>()

  input$ = this.onChanges$.pipe(
    map(() => this),
    startWith(this),
  )

  message$ = this.input$.pipe(
    map(({ message }) => message),
  )

  /**
   * @internal
   */
  readonly messageClasses: { [name: string]: boolean }

  /**
   * @internal
   */
  readonly descriptionClasses: { [name: string]: boolean }

  constructor(
    @Inject(ALERT_PREFIX) prefix: string,
    @Optional() @Self() governor: Governor,
  ) {
    governor.configureStaticClasses([ prefix ])
    governor.configureStaticStyles({ 'display': 'block' })

    this.messageClasses = { [`${prefix}-message`]: true }
    this.descriptionClasses = { [`${prefix}-description`]: true }

    const className$ = this.input$.pipe(
      map(({ type }) => ({
        [`${prefix}-${type}`]: !!type,
        [`${prefix}-no-icon`]: true,
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
