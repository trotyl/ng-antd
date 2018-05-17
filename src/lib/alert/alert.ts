import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnDestroy, Optional, Self, SimpleChanges } from '@angular/core'
/* tslint:disable-next-line:no-unused-variable */
import { Observable, Subject } from 'rxjs'
import { map, takeUntil } from 'rxjs/operators'
import { Governor } from '../extension/governor'
import { extractInputs, updateClass } from '../util/reactive'
import { ALERT_PREFIX } from './token'

@Component({
  selector: 'ant-alert, [antAlert]',
  templateUrl: './alert.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class Alert implements OnChanges, OnDestroy {
  @Input() antAlert: string
  @Input() type: string
  @Input() message: string

  onChanges$ = new Subject<SimpleChanges>()
  onDestroy$ = new Subject<void>()

  input$ = this.onChanges$.pipe(
    extractInputs({
      antAlert: 'info' as string | null,
      type: null as string | null,
      message: null as string | null,
    }),
    map(inputs => ({ ...inputs, type: inputs.type != null ? inputs.type : inputs.antAlert })),
  )

  message$ = this.input$.pipe(
    map(({ message }) => message),
  )

  messageClasses: { [name: string]: boolean }
  descriptionClasses: { [name: string]: boolean }

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
