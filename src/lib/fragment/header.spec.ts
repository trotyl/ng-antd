import { Component, ViewChild } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { FragmentModule } from './fragment.module'
import { Header } from './header'

describe('Header', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FragmentModule ],
      declarations: [
        HeaderPropertyTest,
      ],
    }).compileComponents()
  })

  it('should expose properties', () => {
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
})
class HeaderPropertyTest {
  @ViewChild(Header) header: Header
}
