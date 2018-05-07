import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AsideElement } from './aside'
import { AsideElementModule } from './aside.module'

describe('AsideElement', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AsideElementModule ],
      declarations: [
        AsideElementInjectorTest,
      ],
    }).compileComponents()
  })

  it('should expose injector', () => {
    const fixture = TestBed.createComponent(AsideElementInjectorTest)
    fixture.detectChanges()

    const asideElement = fixture.debugElement.query(By.directive(AsideElement))
    const directive = asideElement.injector.get(AsideElement)

    expect(directive.injector.get(AsideElement)).toBe(directive)
  })

})

@Component({
  template: `
    <aside>Foo</aside>
  `,
})
class AsideElementInjectorTest { }
