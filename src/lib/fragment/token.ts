import { throwError } from '../util/debug'
import { Fragment } from './fragment'

export abstract class FragmentContainer {
  abstract register(fragment: Fragment): void
  abstract deregister(fragment: Fragment): void
}

/* istanbul ignore next */
export class NoopFragmentContainer implements FragmentContainer {
  register(fragment: Fragment): void {
    throwError(`${fragment.type}: not supported here`)
  }

  deregister(fragment: Fragment): void { }
}
