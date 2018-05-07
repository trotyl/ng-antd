import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { LiElement } from './li'
import { LiElementModule } from './li.module'

describe('LiElement', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LiElementModule ],
      declarations: [
        LiElementInjectorTest,
      ],
    }).compileComponents()
  })

  it('should expose injector', () => {
    const fixture = TestBed.createComponent(LiElementInjectorTest)
    fixture.detectChanges()

    const liElement = fixture.debugElement.query(By.directive(LiElement))
    const directive = liElement.injector.get(LiElement)

    expect(directive.injector.get(LiElement)).toBe(directive)
  })

})

@Component({
  template: `
    <li>Foo</li>
  `,
})
class LiElementInjectorTest { }
