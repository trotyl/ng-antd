import { SimpleChange } from '@angular/core'
import { of } from 'rxjs'
import { Governor } from '../extension/governor'
import { extractInputs, updateClass } from './reactive'

describe('ReactiveUtil', () => {
  it('should use latest change', () => {
    const changes = {
      'stringInput': new SimpleChange(null, 'foo', false),
      'numberInput': new SimpleChange(null, 42, false),
      'booleanInput': new SimpleChange(null, true, false),
    }

    let res: any
    of(changes).pipe(
      extractInputs({ stringInput: 'bar', numberInput: -1, booleanInput: false }),
    ).subscribe(x => res = x)

    expect(res).toEqual({ stringInput: 'foo', numberInput: 42, booleanInput: true })
  })

  it('should use cached change when not changed', () => {
    const changes = {
      'stringInput': new SimpleChange(null, 'foo', false),
      'numberInput': new SimpleChange(null, 42, false),
      'booleanInput': new SimpleChange(null, true, false),
    }

    let res: any
    of(changes, {}).pipe(
      extractInputs({ stringInput: 'bar', numberInput: -1, booleanInput: false }),
    ).subscribe(x => res = x)

    expect(res).toEqual({ stringInput: 'foo', numberInput: 42, booleanInput: true })
  })

  it('should fallback to default change', () => {
    let res: any
    of({}).pipe(
      extractInputs({ stringInput: 'bar', numberInput: -1, booleanInput: false }),
    ).subscribe(x => res = x)

    expect(res).toEqual({ stringInput: 'bar', numberInput: -1, booleanInput: false })
  })

  it('should update classes', () => {
    const governor: Governor = { configureClasses: () => {} } as any
    spyOn(governor, 'configureClasses')

    of({ foo: true }).pipe(
      updateClass(governor),
    ).subscribe()

    expect(governor.configureClasses).toHaveBeenCalledWith({ foo: true })
  })
})
