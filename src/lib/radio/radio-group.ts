import { forwardRef, Directive, Inject, OnInit, Self } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { Governor } from '../governor/governor'
import { CompositeControl } from '../util/control'
import { RADIO_GROUP_PREFIX } from './token'

@Directive({
  selector: 'ant-radio-group',
  providers: [
    Governor,
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => RadioGroup) },
  ],
})
export class RadioGroup<T> extends CompositeControl<T> implements OnInit {
  constructor(
    @Self() private governor: Governor,
    @Inject(RADIO_GROUP_PREFIX) private prefix: string,
  ) { super() }

  ngOnInit(): void {
    this.governor.staticClasses = [ this.prefix ]
  }
}
