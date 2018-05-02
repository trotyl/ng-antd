import { Component, Injector, Self } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { Hover, HoverFactory } from './hover'
import { HoverModule } from './hover.module'

describe('HostManager', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HoverModule ],
      declarations: [
        HoverTest,
        HoverFactoryTest,
      ],
    }).compileComponents()
  })

  it('should update hover status', () => {
    const fixture = TestBed.createComponent(HoverTest)
    const component = fixture.componentInstance

    const res: boolean[] = []
    component.hover.changes.subscribe(x => res.push(x))

    fixture.debugElement.nativeElement.dispatchEvent(new CustomEvent('mouseenter'))

    expect(res).toEqual([true])

    fixture.debugElement.nativeElement.dispatchEvent(new CustomEvent('mouseleave'))

    expect(res).toEqual([true, false])
  })

  it('should dynamic create hover', () => {
    const fixture = TestBed.createComponent(HoverFactoryTest)
    const component = fixture.componentInstance

    const hover = component.hoverFactory.create(component.injector)
    const res: boolean[] = []
    hover.changes.subscribe(x => res.push(x))

    fixture.debugElement.nativeElement.dispatchEvent(new CustomEvent('mouseenter'))

    expect(res).toEqual([true])

    fixture.debugElement.nativeElement.dispatchEvent(new CustomEvent('mouseleave'))

    expect(res).toEqual([true, false])
  })

})

@Component({
  template: '',
  providers: [ Hover ],
})
class HoverTest {
  constructor(@Self() public hover: Hover) { }
}

@Component({
  template: '',
})
class HoverFactoryTest {
  constructor(public injector: Injector, public hoverFactory: HoverFactory) { }
}
