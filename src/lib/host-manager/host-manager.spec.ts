import { Component, Self } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { getClassName, getStyle } from '../testing/helper'
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
    expect(getClassName(fixture.debugElement)).toEqual(`foo static`)
  })

  it('should add host classes', () => {
    const fixture = TestBed.createComponent(HostElementTest)
    const component = fixture.componentInstance

    component.host.addClass('baz')

    fixture.detectChanges()
    expect(getClassName(fixture.debugElement)).toEqual(`baz`)
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
    expect(getStyle(fixture.debugElement)).toEqual({
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
