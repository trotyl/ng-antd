import { Fragment } from './fragment'

export abstract class FragmentContainer {
  abstract register(fragment: Fragment): void
  abstract deregister(fragment: Fragment): void
}
