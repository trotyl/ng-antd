import { forwardRef, Component, ViewChild } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { FragmentModule } from './fragment.module'
import { Header } from './header'
import { FragmentContainer } from './token'

describe('Header', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FragmentModule ],
      declarations: [
        HeaderPropertyTest,
      ],
    }).compileComponents()
  })

  xit('should expose properties', () => {
    const fixture = TestBed.createComponent(HeaderPropertyTest)
    const component = fixture.componentInstance

    fixture.detectChanges()

    const header = component.header

    expect(header.injector.get(Header)).toBe(header)
    expect(header.template.createEmbeddedView).toBeDefined()
  })

})

@Component({
  template: `
    <div *antHeader>Foo</div>
  `,
  providers: [
    { provide: FragmentContainer, useExisting: forwardRef(() => HeaderPropertyTest) },
  ],
})
class HeaderPropertyTest implements FragmentContainer {
  @ViewChild(Header, { static: true }) header: Header

  register(): void { }
  deregister(): void { }
}
