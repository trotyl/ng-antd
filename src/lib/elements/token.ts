import { Element } from './element'

export abstract class ElementContainer {
  abstract register(element: Element): void
  abstract deregister(element: Element): void
}

export class NoopElementContainer implements ElementContainer {
  register(element: Element): void { }
  deregister(element: Element): void { }
}
