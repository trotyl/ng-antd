import { forwardRef, Directive, Inject, OnInit, Optional, Self } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { Governor } from '../governor/governor'
import { CompositeControl } from '../util/control'
import { RADIO_GROUP_PREFIX } from './token'

@Directive({
  selector: 'ant-radio-group',
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => RadioGroup) },
  ],
})
export class RadioGroup<T> extends CompositeControl<T> implements OnInit {
  constructor(
    @Inject(RADIO_GROUP_PREFIX) private prefix: string,
    @Optional() @Self() private governor: Governor,
  ) { super() }

  ngOnInit(): void {
    this.governor.configureStaticClasses([ this.prefix ])
  }
}
