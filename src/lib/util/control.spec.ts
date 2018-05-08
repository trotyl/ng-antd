import { ReplaySubject } from 'rxjs/ReplaySubject'
import { values } from '../testing/helper'
import { CompositeControl, Control, KeyedCompositeControl } from './control'

describe('Control', () => {
  let control: ControlTest

  beforeEach(() => {
    control = new ControlTest()
  })

  it('should trigger update by external', () => {
    spyOn(control, 'handleUpdate')

    control.writeValue(42)

    expect(control.handleUpdate).toHaveBeenCalledWith(false)
  })

  it('should trigger disable by external', () => {
    spyOn(control, 'handleDisabled')

    control.setDisabledState(true)

    expect(control.handleDisabled).toHaveBeenCalled()
  })

  it('should trigger update by self', () => {
    spyOn(control, 'handleUpdate')

    control.updateByAction(42)

    expect(control.handleUpdate).toHaveBeenCalledWith(true)
  })

  it('should register onChange', () => {
    const onChangeFn = () => { }
    control.registerOnChange(onChangeFn)

    expect(control.onChangeFn).toBe(onChangeFn)
  })

  it('should register onTouched', () => {
    const onTouchedFn = () => { }
    control.registerOnTouched(onTouchedFn)

    expect(control.onTouchedFn).toBe(onTouchedFn)
  })

})

describe('CompositeControl', () => {
  let control: CompositeControlTest

  beforeEach(() => {
    control = new CompositeControlTest()
  })

  it('should emit status change on update', () => {
    control.compositeStatus$ = new ReplaySubject() as any

    control.writeValue(42)

    expect(values(control.status$).length).toBe(1)
  })

  it('should emit status change on disabled', () => {
    control.compositeStatus$ = new ReplaySubject() as any

    control.setDisabledState(true)

    expect(values(control.status$).length).toBe(1)
  })

})

describe('KeyedCompositeControl', () => {
  let control: KeyedCompositeControlTest

  beforeEach(() => {
    control = new KeyedCompositeControlTest()
  })

  it('should observe parent key', () => {
    const subControl = new KeyedCompositeControlTest()
    subControl.parentComposite = control

    let res = false
    subControl.observeKey('test').subscribe(x => res = x)

    control.pendingKeyedChanges.set('test', true)
    control.flushKey('test')
    subControl.flushKey('test')

    expect(res).toBe(true)
  })
})

class ControlTest extends Control<number> {
  handleUpdate(self: boolean): void { }
  handleDisabled(): void { }
}

class CompositeControlTest extends CompositeControl<number> {
  parentComposite = undefined
}

class KeyedCompositeControlTest extends KeyedCompositeControl<string, boolean> {
  parentComposite?: KeyedCompositeControlTest = undefined
}
