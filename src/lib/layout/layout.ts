import { forwardRef, ContentChildren, Directive, Inject, QueryList } from '@angular/core'
import { Element } from '../elements/element'
import { ElementContainer } from '../elements/token'
import { GovernorFactory } from '../governor/governor'
import { Sider } from './sider'
import { LAYOUT_PREFIX } from './token'

@Directive({
  selector: 'ant-layout, [antLayout]',
  host: {
    '[class.ant-layout]': `true`,
    '[class.ant-layout-has-sider]': `siders.length > 0`,
  },
  providers: [
    { provide: ElementContainer, useExisting: forwardRef(() => Layout) },
  ],
})
export class Layout implements ElementContainer {
  @ContentChildren(Sider) siders: QueryList<Sider>

  constructor(
    @Inject(LAYOUT_PREFIX) private prefix: string,
    private governorFactory: GovernorFactory,
  ) { }

  /* istanbul ignore next */
  register(el: Element): void {
    switch (el.tag) {
      case 'header': return this.addClass(el, `${this.prefix}-header`)
      case 'footer': return this.addClass(el, `${this.prefix}-footer`)
      case 'main': return this.addClass(el, `${this.prefix}-content`)
      case 'aside': return this.addClass(el, `${this.prefix}-sider`)
      default:
    }
  }

  /* istanbul ignore next */
  deregister(el: Element): void { }

  /* istanbul ignore next */
  private addClass(element: Element, className: string): void {
    this.governorFactory.create(element.injector).addClass(className)
  }
}
