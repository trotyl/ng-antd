import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { assertClass } from '../testing/helper'
import { ButtonGroup } from './button-group'
import { ButtonModule } from './button.module'

describe('ButtonGroup', () => {
  const px = 'ant-btn-group'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ButtonModule ],
      declarations: [
        ButtonGroupStaticTest,
        ButtonGroupSizeTest,
        ButtonGroupAttributeSelectorTest,
      ],
    }).compileComponents()
  })

  it('should set static classes properly', () => {
    const fixture = TestBed.createComponent(ButtonGroupStaticTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.directive(ButtonGroup))

    assertClass(buttons[0], [`${px}`])
  })

  it('should set size classes properly', () => {
    const fixture = TestBed.createComponent(ButtonGroupSizeTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.directive(ButtonGroup))

    assertClass(buttons[0], [], [`${px}-lg`, `${px}-sm`])
    assertClass(buttons[1], [], [`${px}-lg`, `${px}-sm`])
    assertClass(buttons[2], [`${px}-lg`])
    assertClass(buttons[3], [`${px}-sm`])
  })

  it('should support attribute selector usage', () => {
    const fixture = TestBed.createComponent(ButtonGroupAttributeSelectorTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.directive(ButtonGroup))

    assertClass(buttons[0], [], [`${px}-lg`, `${px}-sm`])
    assertClass(buttons[1], [`${px}-lg`])
    assertClass(buttons[2], [`${px}-lg`])
  })

})

@Component({
  template: `
    <ant-btn-group>Default</ant-btn-group>
  `,
})
class ButtonGroupStaticTest { }

@Component({
  template: `
    <ant-btn-group>Default</ant-btn-group>
    <ant-btn-group [size]="null">Default</ant-btn-group>
    <ant-btn-group size="large">Large</ant-btn-group>
    <ant-btn-group size="small">Small</ant-btn-group>
  `,
})
class ButtonGroupSizeTest { }

@Component({
  template: `
    <div antBtnGroup>Default</div>
    <div antBtnGroup size="large">Large</div>
    <div antBtnGroup="large">Small</div>
  `,
})
class ButtonGroupAttributeSelectorTest { }
