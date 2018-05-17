import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { assertClass } from '../testing/helper'
import { Alert } from './alert'
import { AlertModule } from './alert.module'

describe('Alert', () => {
  const px = 'ant-alert'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AlertModule ],
      declarations: [
        AlertStaticTest,
        AlertTypeTest,
      ],
    }).compileComponents()
  })

  it('should set static classes properly', () => {
    const fixture = TestBed.createComponent(AlertStaticTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.directive(Alert))

    assertClass(buttons[0], [`${px}`])
  })

  it('should set type classes properly', () => {
    const fixture = TestBed.createComponent(AlertTypeTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.directive(Alert))

    assertClass(buttons[0], [`${px}-info`])
    assertClass(buttons[1], [`${px}-success`])
    assertClass(buttons[2], [`${px}-info`])
    assertClass(buttons[3], [`${px}-warning`])
    assertClass(buttons[4], [`${px}-error`])
    assertClass(buttons[5], [`${px}-info`])
    assertClass(buttons[6], [`${px}-success`])
    assertClass(buttons[7], [`${px}-info`])
    assertClass(buttons[8], [`${px}-warning`])
    assertClass(buttons[9], [`${px}-error`])
    assertClass(buttons[10], [`${px}-success`])
    assertClass(buttons[11], [`${px}-info`])
    assertClass(buttons[12], [`${px}-warning`])
    assertClass(buttons[13], [`${px}-error`])
  })
})

@Component({
  template: `
    <ant-alert>Default</ant-alert>
  `,
})
class AlertStaticTest { }

@Component({
  template: `
    <ant-alert>Info</ant-alert>
    <ant-alert type="success">Success</ant-alert>
    <ant-alert type="info">Info</ant-alert>
    <ant-alert type="warning">Warning</ant-alert>
    <ant-alert type="error">Error</ant-alert>
    <div antAlert>Info</div>
    <div antAlert type="success">Success</div>
    <div antAlert type="info">Info</div>
    <div antAlert type="warning">Warning</div>
    <div antAlert type="error">Error</div>
    <div antAlert="success">Success</div>
    <div antAlert="info">Info</div>
    <div antAlert="warning">Warning</div>
    <div antAlert="error">Error</div>
  `,
})
class AlertTypeTest { }
