import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MainElement } from './main'
import { MainElementModule } from './main.module'

describe('MainElement', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MainElementModule ],
      declarations: [
        MainElementInjectorTest,
      ],
    }).compileComponents()
  })

  it('should expose injector', () => {
    const fixture = TestBed.createComponent(MainElementInjectorTest)
    fixture.detectChanges()

    const mainElement = fixture.debugElement.query(By.directive(MainElement))
    const directive = mainElement.injector.get(MainElement)

    expect(directive.injector.get(MainElement)).toBe(directive)
  })

})

@Component({
  template: `
    <main>Foo</main>
  `,
})
class MainElementInjectorTest { }
