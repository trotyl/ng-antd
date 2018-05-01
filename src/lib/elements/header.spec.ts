import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { HeaderElement } from './header'
import { HeaderElementModule } from './header.module'

describe('HeaderElement', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HeaderElementModule ],
      declarations: [
        HeaderElementInjectorTest,
      ],
    }).compileComponents()
  })

  it('should expose injector', () => {
    const fixture = TestBed.createComponent(HeaderElementInjectorTest)
    fixture.detectChanges()

    const headerElement = fixture.debugElement.query(By.directive(HeaderElement))
    const directive = headerElement.injector.get(HeaderElement)

    expect(directive.injector.get(HeaderElement)).toBe(directive)
  })

})

@Component({
  template: `
    <header>Foo</header>
  `,
})
class HeaderElementInjectorTest { }
