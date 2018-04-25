import { Component, Self } from '@angular/core'
import { async, inject, TestBed } from '@angular/core/testing'
import { NgClass, NgStyle } from '@angular/common'
import { CoreModule } from './core.module'
import { HostElement } from './host-element'

describe('HostElement', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreModule ],
      declarations: [
        HostElementTest,
        HostElementNoDirTest,
      ],
    }).compileComponents()
  }))

  it('should set host classes', () => {
    const fixture = TestBed.createComponent(HostElementTest)
    const component = fixture.componentInstance

    component.host.classes = {
      'foo': true,
      'bar': false,
    }

    fixture.detectChanges()
    expect(fixture.debugElement.classes).toEqual({'foo': true, 'bar': false})
  })

  it('should set host styles', () => {
    const fixture = TestBed.createComponent(HostElementTest)
    const component = fixture.componentInstance

    component.host.styles = {
      'margin': '10px',
      'padding': '5px',
    }

    fixture.detectChanges()
    expect(fixture.debugElement.styles).toEqual({
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
