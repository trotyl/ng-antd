import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { FooterElement } from './footer'
import { FooterElementModule } from './footer.module'

describe('FooterElement', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FooterElementModule ],
      declarations: [
        FooterElementInjectorTest,
      ],
    }).compileComponents()
  })

  it('should expose injector', () => {
    const fixture = TestBed.createComponent(FooterElementInjectorTest)
    fixture.detectChanges()

    const footerElement = fixture.debugElement.query(By.directive(FooterElement))
    const directive = footerElement.injector.get(FooterElement)

    expect(directive.injector.get(FooterElement)).toBe(directive)
  })

})

@Component({
  template: `
    <footer>Foo</footer>
  `,
})
class FooterElementInjectorTest { }
