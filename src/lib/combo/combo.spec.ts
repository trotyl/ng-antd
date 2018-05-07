import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay'
import { Component, ElementRef, Injector, TemplateRef, ViewChild } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { timer } from 'rxjs/observable/timer'
import { take } from 'rxjs/operators'
import { ExtensionModule } from '../extension/extension.module'
import { Combo, ComboFactory } from './combo'

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
      imports: [ ExtensionModule ],
      declarations: [
        ComboTest,
        ComboFactoryTest,
      ],
      providers: [
        { provide: Overlay, useFactory: () => overlay },
      ],
    }).compileComponents()
  })

  it('should update status', async (done: Function) => {
    const fixture = TestBed.createComponent(ComboTest)
    const component = fixture.componentInstance

    fixture.detectChanges()

    spyOn(overlayRef, 'attach')
    spyOn(overlayRef, 'detach')

    component.combo.configTemplate(component.template)
    expect(overlayRef.attach).not.toHaveBeenCalled()

    component.el.nativeElement.dispatchEvent(new CustomEvent('mouseenter'))
    expect(overlayRef.attach).toHaveBeenCalled()

    component.el.nativeElement.dispatchEvent(new CustomEvent('mouseleave'))
    expect(overlayRef.detach).not.toHaveBeenCalled()

    overlayElement.dispatchEvent(new CustomEvent('mouseenter'))
    expect(overlayRef.detach).not.toHaveBeenCalled()

    await timer(300).pipe(take(1)).toPromise()
    expect(overlayRef.detach).not.toHaveBeenCalled()

    overlayElement.dispatchEvent(new CustomEvent('mouseleave'))
    expect(overlayRef.detach).not.toHaveBeenCalled()

    await timer(300).pipe(take(1)).toPromise()
    expect(overlayRef.detach).toHaveBeenCalled()

    done()
  })

  it('should detach old template', () => {
    const fixture = TestBed.createComponent(ComboTest)
    const component = fixture.componentInstance

    fixture.detectChanges()

    spyOn(overlayRef, 'detach')

    component.combo.configTemplate(component.template)
    component.el.nativeElement.dispatchEvent(new CustomEvent('mouseenter'))

    component.combo.configTemplate(component.template)

    expect(overlayRef.detach).toHaveBeenCalled()
  })

  it('should dispose overlay when destroyed', () => {
    const fixture = TestBed.createComponent(ComboTest)
    const component = fixture.componentInstance
    component.combo.configTemplate(component.template)

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
    <div antExtCombo></div>
    <ng-template #template></ng-template>
  `,
})
class ComboTest {
  @ViewChild(Combo) combo: Combo
  @ViewChild(Combo, { read: ElementRef }) el: ElementRef
  @ViewChild('template') template: TemplateRef<void>
}

@Component({
  template: '',
})
class ComboFactoryTest {
  constructor(public injector: Injector, public comboFactory: ComboFactory) { }
}
