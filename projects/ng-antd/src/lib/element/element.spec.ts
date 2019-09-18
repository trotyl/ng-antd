import { forwardRef, Component, Directive } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AsideElement, Element, FooterElement, HeaderElement, LiElement, MainElement } from './element'
import { AsideElementModule, FooterElementModule, HeaderElementModule, LiElementModule, MainElementModule } from './element.module'
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

describe('AsideElement', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AsideElementModule ],
      declarations: [
        AsideElementInjectorTest,
      ],
    }).compileComponents()
  })

  xit('should expose injector', () => {
    const fixture = TestBed.createComponent(AsideElementInjectorTest)
    fixture.detectChanges()

    const asideElement = fixture.debugElement.query(By.directive(AsideElement))
    const directive = asideElement.injector.get(AsideElement)

    expect(directive.injector.get(AsideElement)).toBe(directive)
  })

})

describe('FooterElement', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FooterElementModule ],
      declarations: [
        FooterElementInjectorTest,
      ],
    }).compileComponents()
  })

  xit('should expose injector', () => {
    const fixture = TestBed.createComponent(FooterElementInjectorTest)
    fixture.detectChanges()

    const footerElement = fixture.debugElement.query(By.directive(FooterElement))
    const directive = footerElement.injector.get(FooterElement)

    expect(directive.injector.get(FooterElement)).toBe(directive)
  })

})

describe('HeaderElement', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HeaderElementModule ],
      declarations: [
        HeaderElementInjectorTest,
      ],
    }).compileComponents()
  })

  xit('should expose injector', () => {
    const fixture = TestBed.createComponent(HeaderElementInjectorTest)
    fixture.detectChanges()

    const headerElement = fixture.debugElement.query(By.directive(HeaderElement))
    const directive = headerElement.injector.get(HeaderElement)

    expect(directive.injector.get(HeaderElement)).toBe(directive)
  })

})

describe('LiElement', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LiElementModule ],
      declarations: [
        LiElementInjectorTest,
      ],
    }).compileComponents()
  })

  xit('should expose injector', () => {
    const fixture = TestBed.createComponent(LiElementInjectorTest)
    fixture.detectChanges()

    const liElement = fixture.debugElement.query(By.directive(LiElement))
    const directive = liElement.injector.get(LiElement)

    expect(directive.injector.get(LiElement)).toBe(directive)
  })

})

describe('MainElement', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MainElementModule ],
      declarations: [
        MainElementInjectorTest,
      ],
    }).compileComponents()
  })

  xit('should expose injector', () => {
    const fixture = TestBed.createComponent(MainElementInjectorTest)
    fixture.detectChanges()

    const mainElement = fixture.debugElement.query(By.directive(MainElement))
    const directive = mainElement.injector.get(MainElement)

    expect(directive.injector.get(MainElement)).toBe(directive)
  })

})

@Component({
  template: `
    <div myContainer>
      <div myElement>Test Element</div>
    </div>
  `,
})
class ElementWithContainerTest { }

@Component({
  template: `
    <aside>Foo</aside>
  `,
})
class AsideElementInjectorTest { }

@Component({
  template: `
    <footer>Foo</footer>
  `,
})
class FooterElementInjectorTest { }

@Component({
  template: `
    <header>Foo</header>
  `,
})
class HeaderElementInjectorTest { }

@Component({
  template: `
    <li>Foo</li>
  `,
})
class LiElementInjectorTest { }

@Component({
  template: `
    <main>Foo</main>
  `,
})
class MainElementInjectorTest { }
