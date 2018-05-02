import { Component, Injector, Self } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { assertClass, assertStyle } from '../testing/helper'
import { Governor, GovernorFactory } from './governor'
import { GovernorModule } from './governor.module'

describe('Governor', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GovernorModule ],
      declarations: [
        HostManagerTest,
        HostManagerFactoryTest,
      ],
    }).compileComponents()
  })

  it('should set classes', () => {
    const fixture = TestBed.createComponent(HostManagerTest)
    const component = fixture.componentInstance

    component.governor.staticClasses = [ 'static' ]

    component.governor.classes = {
      'foo': true,
      'bar': false,
    }

    assertClass(fixture.debugElement, [`static`, `foo`], [`bar`])
  })

  it('should change classes', () => {
    const fixture = TestBed.createComponent(HostManagerTest)
    const component = fixture.componentInstance

    component.governor.classes = {
      'foo': true,
      'bar': true,
      'baz': true,
    }

    component.governor.classes = {
      'foo': true,
      'bar': false,
    }

    assertClass(fixture.debugElement, [`foo`], [`bar`, `baz`])
  })

  it('should add classes', () => {
    const fixture = TestBed.createComponent(HostManagerTest)
    const component = fixture.componentInstance

    component.governor.addClass('baz')

    assertClass(fixture.debugElement, [`baz`])
  })

  it('should set styles', () => {
    const fixture = TestBed.createComponent(HostManagerTest)
    const component = fixture.componentInstance

    component.governor.staticStyles = {
      'height': '20px',
    }

    component.governor.styles = {
      'margin': '10px',
      'padding': '5px',
    }

    assertStyle(fixture.debugElement, {
      'height': '20px',
      'margin': '10px',
      'padding': '5px',
    })
  })

  it('should change styles', () => {
    const fixture = TestBed.createComponent(HostManagerTest)
    const component = fixture.componentInstance

    component.governor.styles = {
      'margin': '10px',
      'padding': '5px',
      'height': '20px',
    }

    component.governor.styles = {
      'margin': '20px',
      'padding': null!,
    }

    assertStyle(fixture.debugElement, {
      'margin': '20px',
    })
  })

  it('should dynamic create governor', () => {
    const fixture = TestBed.createComponent(HostManagerFactoryTest)
    const component = fixture.componentInstance

    const governor = component.governorFactory.create(component.injector)
    governor.addClass('foo')

    assertClass(fixture.debugElement, [`foo`])
  })

})

@Component({
  template: '',
  providers: [ Governor ],
})
class HostManagerTest {
  constructor(@Self() public governor: Governor) { }
}

@Component({
  template: '',
})
class HostManagerFactoryTest {
  constructor(public injector: Injector, public governorFactory: GovernorFactory) { }
}
