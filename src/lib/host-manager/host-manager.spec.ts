import { Component, Injector, Self } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { assertClass, assertStyle } from '../testing/helper'
import { HostManager, HostManagerFactory } from './host-manager'
import { HostManagerModule } from './host-manager.module'

describe('HostManager', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HostManagerModule ],
      declarations: [
        HostManagerTest,
        HostManagerFactoryTest,
      ],
    }).compileComponents()
  })

  it('should set host classes', () => {
    const fixture = TestBed.createComponent(HostManagerTest)
    const component = fixture.componentInstance

    component.host.staticClasses = [ 'static' ]

    component.host.classes = {
      'foo': true,
      'bar': false,
    }

    assertClass(fixture.debugElement, [`static`, `foo`], [`bar`])
  })

  it('should change host classes', () => {
    const fixture = TestBed.createComponent(HostManagerTest)
    const component = fixture.componentInstance

    component.host.classes = {
      'foo': true,
      'bar': true,
      'baz': true,
    }

    component.host.classes = {
      'foo': true,
      'bar': false,
    }

    assertClass(fixture.debugElement, [`foo`], [`bar`, `baz`])
  })

  it('should add host classes', () => {
    const fixture = TestBed.createComponent(HostManagerTest)
    const component = fixture.componentInstance

    component.host.addClass('baz')

    assertClass(fixture.debugElement, [`baz`])
  })

  it('should set host styles', () => {
    const fixture = TestBed.createComponent(HostManagerTest)
    const component = fixture.componentInstance

    component.host.staticStyles = {
      'height': '20px',
    }

    component.host.styles = {
      'margin': '10px',
      'padding': '5px',
    }

    assertStyle(fixture.debugElement, {
      'height': '20px',
      'margin': '10px',
      'padding': '5px',
    })
  })

  it('should change host styles', () => {
    const fixture = TestBed.createComponent(HostManagerTest)
    const component = fixture.componentInstance

    component.host.styles = {
      'margin': '10px',
      'padding': '5px',
      'height': '20px',
    }

    component.host.styles = {
      'margin': '20px',
      'padding': null!,
    }

    assertStyle(fixture.debugElement, {
      'margin': '20px',
    })
  })

  it('should dynamic create host manager', () => {
    const fixture = TestBed.createComponent(HostManagerFactoryTest)
    const component = fixture.componentInstance

    const host = component.hostFactory.create(component.injector)
    host.addClass('foo')

    assertClass(fixture.debugElement, [`foo`])
  })

})

@Component({
  template: '',
  providers: [ HostManager ],
})
class HostManagerTest {
  constructor(@Self() public host: HostManager) { }
}

@Component({
  template: '',
})
class HostManagerFactoryTest {
  constructor(public injector: Injector, public hostFactory: HostManagerFactory) { }
}
