import { Component, Self } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { NgClass, NgStyle } from '@angular/common'
import { getClassName, getStyle } from '../testing/helper'
import { HostElement } from './host-element'

describe('HostElement', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [
        HostElementTest,
        HostElementNoDirTest,
      ],
    }).compileComponents()
  })

  it('should set host classes', () => {
    const fixture = TestBed.createComponent(HostElementTest)
    const component = fixture.componentInstance

    component.host.classes = {
      'foo': true,
      'bar': false,
    }

    fixture.detectChanges()
    expect(getClassName(fixture.debugElement)).toEqual(`foo`)
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

    component.host.styles = {
      'margin': '10px',
      'padding': '5px',
    }

    fixture.detectChanges()
    expect(getStyle(fixture.debugElement)).toEqual({
      'margin': '10px',
      'padding': '5px',
    })
  })

  it('should throw when no directive available', () => {
    const fixture = TestBed.createComponent(HostElementNoDirTest)
    const component = fixture.componentInstance

    expect(() => component.host.classes = {}).toThrowError(/NgClass/)
    expect(() => component.host.styles = {}).toThrowError(/NgStyle/)
  })
})

@Component({
  template: '',
  providers: [ NgClass, NgStyle, HostElement ],
})
class HostElementTest {
  constructor(@Self() public host: HostElement) { }
}

@Component({
  template: '',
  providers: [ HostElement ],
})
class HostElementNoDirTest {
  constructor(@Self() public host: HostElement) { }
}
