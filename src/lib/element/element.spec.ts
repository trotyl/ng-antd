import { forwardRef, Component, Directive } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Element } from './element'
import { ElementContainer } from './token'

describe('Element', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DummyElement,
        DummyContainer,
        ElementWithContainerTest,
      ],
    }).compileComponents()
  })

  it('should register to container', () => {
    const fixture = TestBed.createComponent(ElementWithContainerTest)
    fixture.detectChanges()

    const container = fixture.debugElement.query(By.directive(DummyContainer))
    const instance = container.injector.get(DummyContainer)

    expect(instance.element!.tag).toBe('test')
  })

})

@Directive({
  selector: '[myElement]',
})
class DummyElement extends Element {
  tag = 'test'
}

@Directive({
  selector: '[myContainer]',
  providers: [
    { provide: ElementContainer, useExisting: forwardRef(() => DummyContainer) },
  ],
})
class DummyContainer implements ElementContainer {
  element: Element | null = null

  register(element: Element): void {
    this.element = element
  }

  deregister(element: Element): void {
    this.element = null
  }
}

@Component({
  template: `
    <div myContainer>
      <div myElement>Test Element</div>
    </div>
  `,
})
class ElementWithContainerTest { }
