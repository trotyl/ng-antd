import { forwardRef, Component, ViewChild } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { Footer } from './footer'
import { FragmentModule } from './fragment.module'
import { FragmentContainer } from './token'

describe('Footer', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FragmentModule ],
      declarations: [
        FooterPropertyTest,
      ],
    }).compileComponents()
  })

  it('should expose properties', () => {
    const fixture = TestBed.createComponent(FooterPropertyTest)
    const component = fixture.componentInstance

    fixture.detectChanges()

    const footer = component.footer

    expect(footer.injector.get(Footer)).toBe(footer)
    expect(footer.template.createEmbeddedView).toBeDefined()
  })

})

@Component({
  template: `
    <div *antFooter>Foo</div>
  `,
  providers: [
    { provide: FragmentContainer, useExisting: forwardRef(() => FooterPropertyTest) },
  ],
})
class FooterPropertyTest implements FragmentContainer {
  @ViewChild(Footer) footer: Footer

  register(): void { }
  deregister(): void { }
}
