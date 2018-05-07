import { Component, Injector, ViewChild } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { assertClass, assertStyle } from '../testing/helper'
import { ExtensionModule } from './extension.module'
import { Governor, GovernorFactory } from './governor'

describe('Governor', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ExtensionModule ],
      declarations: [
        HostManagerTest,
        HostManagerFactoryTest,
      ],
    }).compileComponents()
  })

  it('should set classes', () => {
    const fixture = TestBed.createComponent(HostManagerTest)
    const component = fixture.componentInstance

    component.governor.configureStaticClasses([ 'static' ])

    component.governor.configureClasses({
      'foo': true,
      'bar': false,
    })

    assertClass(fixture.debugElement.query(By.directive(Governor)), [`static`, `foo`], [`bar`])
  })

  it('should change classes', () => {
    const fixture = TestBed.createComponent(HostManagerTest)
    const component = fixture.componentInstance

    component.governor.configureClasses({
      'foo': true,
      'bar': true,
      'baz': true,
    })

    component.governor.configureClasses({
      'foo': true,
      'bar': false,
    })

    assertClass(fixture.debugElement.query(By.directive(Governor)), [`foo`], [`bar`, `baz`])
  })

  it('should add classes', () => {
    const fixture = TestBed.createComponent(HostManagerTest)
    const component = fixture.componentInstance

    component.governor.addClass('baz')

    assertClass(fixture.debugElement.query(By.directive(Governor)), [`baz`])
  })

  it('should set styles', () => {
    const fixture = TestBed.createComponent(HostManagerTest)
    const component = fixture.componentInstance

    component.governor.configureStaticStyles({
      'height': '20px',
    })

    component.governor.configureStyles({
      'margin': '10px',
      'padding': '5px',
    })

    assertStyle(fixture.debugElement.query(By.directive(Governor)), {
      'height': '20px',
      'margin': '10px',
      'padding': '5px',
    })
  })

  it('should change styles', () => {
    const fixture = TestBed.createComponent(HostManagerTest)
    const component = fixture.componentInstance

    component.governor.configureStyles({
      'margin': '10px',
      'padding': '5px',
      'height': '20px',
    })

    component.governor.configureStyles({
      'margin': '20px',
      'padding': null!,
    })

    assertStyle(fixture.debugElement.query(By.directive(Governor)), {
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
  template: `
    <div antExtGovernor></div>
  `,
})
class HostManagerTest {
  @ViewChild(Governor) governor: Governor
}

@Component({
  template: '',
})
class HostManagerFactoryTest {
  constructor(public injector: Injector, public governorFactory: GovernorFactory) { }
}
