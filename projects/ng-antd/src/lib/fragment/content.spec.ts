import { forwardRef, Component, ViewChild } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { Content } from './content'
import { FragmentModule } from './fragment.module'
import { FragmentContainer } from './token'

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
  providers: [
    { provide: FragmentContainer, useExisting: forwardRef(() => ContentPropertyTest) },
  ],
})
class ContentPropertyTest implements FragmentContainer {
  @ViewChild(Content, { static: true }) content: Content

  register(): void { }
  deregister(): void { }
}
