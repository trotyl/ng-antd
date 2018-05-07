import { Element } from './element'

export abstract class ElementContainer {
  abstract register(element: Element): void
  abstract deregister(element: Element): void
}
