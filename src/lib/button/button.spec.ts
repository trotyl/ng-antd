import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Icon } from '../icon/icon'
import { assertClass } from '../testing/helper'
import { Button } from './button'
import { ButtonModule } from './button.module'

describe('Button', () => {
  const px = 'ant-btn'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ButtonModule ],
      declarations: [
        ButtonStaticTest,
        ButtonTypeTest,
        ButtonSizeTest,
        ButtonLoadingTest,
        ButtonIconTest,
        ButtonGhostTest,
        ButtonErrorConflictIconLoadingTest,
        ButtonErrorConflitIconIconOnlyTest,
      ],
    }).compileComponents()
  })

  it('should set static classes properly', () => {
    const fixture = TestBed.createComponent(ButtonStaticTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.directive(Button))

    assertClass(buttons[0], [`${px}`])
  })

  it('should set type classes properly', () => {
    const fixture = TestBed.createComponent(ButtonTypeTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.directive(Button))

    assertClass(buttons[0], [], [`${px}-primary`, `${px}-dashed`, `${px}-danger`])
    assertClass(buttons[1], [], [`${px}-primary`, `${px}-dashed`, `${px}-danger`])
    assertClass(buttons[2], [`${px}-primary`])
    assertClass(buttons[3], [`${px}-dashed`])
    assertClass(buttons[4], [`${px}-danger`])
    assertClass(buttons[5], [`${px}-primary`])
  })

  it('should set size classes properly', () => {
    const fixture = TestBed.createComponent(ButtonSizeTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.directive(Button))

    assertClass(buttons[0], [], [`${px}-lg`, `${px}-sm`])
    assertClass(buttons[1], [], [`${px}-lg`, `${px}-sm`])
    assertClass(buttons[2], [`${px}-lg`])
    assertClass(buttons[3], [`${px}-sm`])
  })

  it('should set loading classes properly', () => {
    const fixture = TestBed.createComponent(ButtonLoadingTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.directive(Button))

    assertClass(buttons[0], [], [`${px}-loading`])
    assertClass(buttons[1], [`${px}-loading`])
    assertClass(buttons[2], [`${px}-loading`])
    assertClass(buttons[3], [], [`${px}-loading`])
    assertClass(buttons[4], [`${px}-loading`])
    assertClass(buttons[5], [], [`${px}-loading`])
  })

  it('should set icon classes properly', () => {
    const fixture = TestBed.createComponent(ButtonIconTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.directive(Button))
    const icons = buttons.map(button => button.query(By.directive(Icon)))
    const iconTypes = icons.map(de => de && de.injector.get(Icon))

    assertClass(buttons[0], [], [`${px}-circle`, `${px}-icon-only`])
    expect(iconTypes[0]).toBeNull()
    assertClass(buttons[1], [], [`${px}-circle`, `${px}-icon-only`])
    expect(iconTypes[1].type).toBe(`search`)
    assertClass(buttons[2], [`${px}-circle`, `${px}-icon-only`])
    expect(iconTypes[2].type).toBe(`search`)
    assertClass(buttons[3], [`${px}-icon-only`], [`${px}-circle`])
    expect(iconTypes[3].type).toBe(`search`)
  })

  it('should set ghost classes properly', () => {
    const fixture = TestBed.createComponent(ButtonGhostTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.directive(Button))

    assertClass(buttons[0], [], [`${px}-background-ghost`])
    assertClass(buttons[1], [`${px}-background-ghost`])
    assertClass(buttons[2], [`${px}-background-ghost`])
    assertClass(buttons[3], [], [`${px}-background-ghost`])
    assertClass(buttons[4], [`${px}-background-ghost`])
    assertClass(buttons[5], [], [`${px}-background-ghost`])
  })

  it('should report error when set icon and loading', () => {
    const fixture = TestBed.createComponent(ButtonErrorConflictIconLoadingTest)
    expect(() => fixture.detectChanges()).toThrowError(/antBtn: unexpected 'loading' input with 'icon' set/)
  })

  it('should report error when set iconOnly but not icon', () => {
    const fixture = TestBed.createComponent(ButtonErrorConflitIconIconOnlyTest)
    expect(() => fixture.detectChanges()).toThrowError(/antBtn: expected 'iconOnly' input without 'icon' set/)
  })

})

@Component({
  template: `
    <button antBtn>Default</button>
  `,
})
class ButtonStaticTest { }

@Component({
  template: `
    <button antBtn>Default</button>
    <button antBtn [color]="null">Default</button>
    <button antBtn color="primary">Primary</button>
    <button antBtn color="dashed">Dashed</button>
    <button antBtn color="danger">Danger</button>
    <button antBtn="primary">Primary</button>
  `,
})
class ButtonTypeTest { }

@Component({
  template: `
    <button antBtn>Default</button>
    <button antBtn [size]="null">Default</button>
    <button antBtn size="large">Large</button>
    <button antBtn size="small">Small</button>
  `,
})
class ButtonSizeTest { }

@Component({
  template: `
    <button antBtn>Default</button>
    <button antBtn loading>Loading</button>
    <button antBtn loading="true">Loading</button>
    <button antBtn loading="false">Default</button>
    <button antBtn [loading]="true">Loading</button>
    <button antBtn [loading]="false">Default</button>
  `,
})
class ButtonLoadingTest { }

@Component({
  template: `
    <button antBtn>Default</button>
    <button antBtn icon="search">Search</button>
    <button antBtn icon="search" shape="circle">Search</button>
    <button antBtn icon="search" iconOnly></button>
  `,
})
class ButtonIconTest { }

@Component({
  template: `
    <button antBtn>Default</button>
    <button antBtn ghost>Ghost</button>
    <button antBtn ghost="true">Ghost</button>
    <button antBtn ghost="false">Default</button>
    <button antBtn [ghost]="true">Ghost</button>
    <button antBtn [ghost]="false">Default</button>
  `,
})
class ButtonGhostTest { }

@Component({
  template: `
    <button antBtn icon="search" loading>Searching</button>
  `,
})
class ButtonErrorConflictIconLoadingTest { }

@Component({
  template: `
    <button antBtn iconOnly>Default</button>
  `,
})
class ButtonErrorConflitIconIconOnlyTest { }
