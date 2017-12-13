import { Component } from '@angular/core'
import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getClassName } from '../testing/helper'
import { ButtonModule } from './button.module'

describe('ButtonGroup', () => {
  const btnGroupPrefix = 'ant-btn-group'

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ButtonModule ],
      declarations: [
        ButtonGroupSizeTest,
      ]
    }).compileComponents()
  }))

  it('should set size classes properly', async(() => {
    const fixture = TestBed.createComponent(ButtonGroupSizeTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.css('ant-btn-group'))
    expect(getClassName(buttons[0])).toBe(`${btnGroupPrefix}`)
    expect(getClassName(buttons[1])).toBe(`${btnGroupPrefix}`)
    expect(getClassName(buttons[2])).toBe(`${btnGroupPrefix} ${btnGroupPrefix}-lg`)
    expect(getClassName(buttons[3])).toBe(`${btnGroupPrefix} ${btnGroupPrefix}-sm`)
  }))

})

@Component({
  template: `
    <ant-btn-group>Default</ant-btn-group>
    <ant-btn-group size="default">Default</ant-btn-group>
    <ant-btn-group size="large">Large</ant-btn-group>
    <ant-btn-group size="small">Small</ant-btn-group>
  `
})
class ButtonGroupSizeTest { }
