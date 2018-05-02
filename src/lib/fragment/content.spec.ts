import { Component, ViewChild } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { Content } from './content'
import { FragmentModule } from './fragment.module'

describe('Content', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FragmentModule ],
      declarations: [
        ContentPropertyTest,
      ],
    }).compileComponents()
  })

  it('should expose properties', () => {
    const fixture = TestBed.createComponent(ContentPropertyTest)
    const component = fixture.componentInstance

    fixture.detectChanges()

    const content = component.content

    expect(content.injector.get(Content)).toBe(content)
    expect(content.template.createEmbeddedView).toBeDefined()
  })

})

@Component({
  template: `
    <div *antContent>Foo</div>
  `,
})
class ContentPropertyTest {
  @ViewChild(Content) content: Content
}
