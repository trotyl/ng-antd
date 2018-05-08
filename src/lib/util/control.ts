import { OnDestroy } from '@angular/core'
import { ControlValueAccessor } from '@angular/forms'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import { Subject } from 'rxjs/Subject'
import { ISubscription } from 'rxjs/Subscription'

export type OnChangeFn<T> = (value: T | null) => void
export type OnTouchedFn = () => void

/* istanbul ignore next */
export function noop(): void { }

export abstract class Control<T> implements ControlValueAccessor {
  value: T | null = null
  disabled: boolean = false
  onChangeFn: OnChangeFn<T> = noop
  onTouchedFn: OnTouchedFn = noop

  writeValue(value: T | null): void {
    this.value = value
    this.handleUpdate(false)
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChangeFn = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn
  }

  updateByAction(value: T | null): void {
    this.value = value
    this.handleUpdate(true)
    this.onChangeFn(value)
    this.onTouchedFn()
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled
    this.handleDisabled()
  }

  abstract handleUpdate(self: boolean): void
  abstract handleDisabled(): void
}

export abstract class CompositeControl<T> extends Control<T> {
  status$: Subject<void> = new Subject()

  handleUpdate(self: boolean): void {
    this.status$.next()
  }

  handleDisabled(): void {
    this.status$.next()
  }
}

export abstract class ControlItem implements OnDestroy {
  status$$: ISubscription

  abstract ngOnDestroy(): void
}

export abstract class KeyedCompositeControl<K, V, T = K> extends CompositeControl<T> {
  abstract parentComposite?: KeyedCompositeControl<K, V, T>
  pendingKeyedChanges = new Map<K, V>()
  keyedObservers = new Map<K, Observer<V>>()

  observeKey(key: K): Observable<V> {
    if (this.parentComposite) {
      this.parentComposite.observeKey(key).subscribe(value => this.pendingKeyedChanges.set(key, value))
    }
    const observer = new ReplaySubject<V>(1)
    this.keyedObservers.set(key, observer)
    this.flushKey(key)
    return observer as any
  }

  flushKey(key: K): void {
    const observer = this.keyedObservers.get(key)
    if (observer && this.pendingKeyedChanges.has(key)) {
      observer.next(this.pendingKeyedChanges.get(key)!)
      this.pendingKeyedChanges.delete(key)
    }
  }
}
