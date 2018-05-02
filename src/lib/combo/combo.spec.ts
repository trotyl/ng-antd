import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay'
import { Component, Injector, Self, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core'
import { async, TestBed } from '@angular/core/testing'
import { timer } from 'rxjs/observable/timer'
import { take } from 'rxjs/operators'
import { Combo, ComboFactory } from './combo'
import { ComboModule } from './combo.module'

describe('Combo', () => {
  let position: OverlayPositionBuilder
  let overlayElement: HTMLElement
  let overlayRef: OverlayRef
  let overlay: Overlay

  beforeEach(() => {
    position = {
      connectedTo: () => { },
    } as any
    overlayElement = document.createElement('div')
    overlayRef = {
      overlayElement,
      attach: () => { },
      detach: () => { },
      hasAttached: () => false,
      dispose: () => { },
    } as any
    overlay = {
      position: () => position,
      scrollStrategies: { reposition: () => { } },
      create: () => overlayRef,
    } as any
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ComboModule ],
      declarations: [
        ComboTest,
        ComboFactoryTest,
      ],
      providers: [
        { provide: Overlay, useFactory: () => overlay },
      ],
    }).compileComponents()
  })

  it('should update status', async(async () => {
    const fixture = TestBed.createComponent(ComboTest)
    const component = fixture.componentInstance

    fixture.detectChanges()

    spyOn(overlayRef, 'attach')
    spyOn(overlayRef, 'detach')

    component.combo.init(component.template, component.vcRef)
    expect(overlayRef.attach).not.toHaveBeenCalled()

    fixture.debugElement.nativeElement.dispatchEvent(new CustomEvent('mouseenter'))
    expect(overlayRef.attach).toHaveBeenCalled()

    fixture.debugElement.nativeElement.dispatchEvent(new CustomEvent('mouseleave'))
    expect(overlayRef.detach).not.toHaveBeenCalled()

    overlayElement.dispatchEvent(new CustomEvent('mouseenter'))
    expect(overlayRef.detach).not.toHaveBeenCalled()

    await timer(300).pipe(take(1)).toPromise()
    expect(overlayRef.detach).not.toHaveBeenCalled()

    overlayElement.dispatchEvent(new CustomEvent('mouseleave'))
    expect(overlayRef.detach).not.toHaveBeenCalled()

    await timer(300).pipe(take(1)).toPromise()
    expect(overlayRef.detach).toHaveBeenCalled()
  }))

  it('should dispose overlay when destroyed', () => {
    const fixture = TestBed.createComponent(ComboTest)
    const component = fixture.componentInstance
    component.combo.init(component.template, component.vcRef)

    spyOn(overlayRef, 'dispose')

    fixture.destroy()

    expect(overlayRef.dispose).toHaveBeenCalled()
  })

  it('should dynamic create combo', () => {
    const fixture = TestBed.createComponent(ComboFactoryTest)
    const component = fixture.componentInstance

    const combo = component.comboFactory.create(component.injector)

    expect(combo instanceof Combo).toBe(true)
  })

})

@Component({
  template: `
    <ng-template #template></ng-template>
  `,
  providers: [ Combo ],
})
class ComboTest {
  @ViewChild('template') template: TemplateRef<void>

  constructor(
    public vcRef: ViewContainerRef,
    @Self() public combo: Combo,
  ) { }
}

@Component({
  template: '',
})
class ComboFactoryTest {
  constructor(public injector: Injector, public comboFactory: ComboFactory) { }
}
