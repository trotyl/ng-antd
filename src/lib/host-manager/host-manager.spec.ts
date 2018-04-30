import { Component, Self } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { assertClass, assertStyle } from '../testing/helper'
import { HostManager } from './host-manager'

describe('HostManager', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HostElementTest,
      ],
    }).compileComponents()
  })

  it('should set host classes', () => {
    const fixture = TestBed.createComponent(HostElementTest)
    const component = fixture.componentInstance

    component.host.staticClasses = [ 'static' ]

    component.host.classes = {
      'foo': true,
      'bar': false,
    }

    fixture.detectChanges()

    assertClass(fixture.debugElement, [`static`, `foo`])
  })

  it('should add host classes', () => {
    const fixture = TestBed.createComponent(HostElementTest)
    const component = fixture.componentInstance

    component.host.addClass('baz')

    fixture.detectChanges()

    assertClass(fixture.debugElement, [`baz`])
  })

  it('should set host styles', () => {
    const fixture = TestBed.createComponent(HostElementTest)
    const component = fixture.componentInstance

    component.host.staticStyles = {
      'height': '20px',
    }

    component.host.styles = {
      'margin': '10px',
      'padding': '5px',
    }

    fixture.detectChanges()

    assertStyle(fixture.debugElement, {
      'height': '20px',
      'margin': '10px',
      'padding': '5px',
    })
  })
})

@Component({
  template: '',
  providers: [ HostManager ],
})
class HostElementTest {
  constructor(@Self() public host: HostManager) { }
}
