import { Component, ElementRef, Injector, ViewChild } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { ExtensionModule } from './extension.module'
import { Hover, HoverFactory } from './hover'

describe('Hover', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ExtensionModule ],
      declarations: [
        HoverTest,
        HoverFactoryTest,
      ],
    }).compileComponents()
  })

  it('should update hover status', () => {
    const fixture = TestBed.createComponent(HoverTest)
    const component = fixture.componentInstance
    fixture.detectChanges()

    const res: boolean[] = []
    component.hover.changes.subscribe(x => res.push(x))

    component.el.nativeElement.dispatchEvent(new CustomEvent('mouseenter'))

    expect(res).toEqual([true])

    component.el.nativeElement.dispatchEvent(new CustomEvent('mouseleave'))

    expect(res).toEqual([true, false])
  })

  it('should dynamic create hover', () => {
    const fixture = TestBed.createComponent(HoverFactoryTest)
    const component = fixture.componentInstance

    const hover = component.hoverFactory.create(component.injector)
    const res: boolean[] = []
    hover.changes.subscribe(x => res.push(x))
    hover.ngAfterViewInit()

    fixture.debugElement.nativeElement.dispatchEvent(new CustomEvent('mouseenter'))

    expect(res).toEqual([true])

    fixture.debugElement.nativeElement.dispatchEvent(new CustomEvent('mouseleave'))

    expect(res).toEqual([true, false])

    hover.ngOnDestroy()
  })

})

@Component({
  template: `
    <div antExtHover></div>
  `,
})
class HoverTest {
  @ViewChild(Hover) hover: Hover
  @ViewChild(Hover, { read: ElementRef }) el: ElementRef
}

@Component({
  template: '',
})
class HoverFactoryTest {
  constructor(public injector: Injector, public hoverFactory: HoverFactory) { }
}
