import { of } from 'rxjs'
import { Governor } from '../extension/governor'
import { updateClass } from './reactive'

describe('ReactiveUtil', () => {
  it('should update classes', () => {
    const governor: Governor = { configureClasses: () => {} } as any
    spyOn(governor, 'configureClasses')

    of({ foo: true }).pipe(
      updateClass(governor),
    ).subscribe()

    expect(governor.configureClasses).toHaveBeenCalledWith({ foo: true })
  })
})
