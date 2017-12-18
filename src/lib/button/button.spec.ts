import { Component } from '@angular/core'
import { TestBed, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getClassName } from '../testing/testing.module'
import { Icon } from '../icon/icon.module'
import { ButtonModule, Button } from './button.module'

describe('Button', () => {
  const btnPrefix = 'ant-btn'
  const iconPrefix = 'anticon'

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ButtonModule ],
      declarations: [
        ButtonTypeTest,
        ButtonSizeTest,
        ButtonLoadingTest,
        ButtonIconTest,
        ButtonGhostTest,
      ]
    }).compileComponents()
  }))

  it('should set type classes properly', async(() => {
    const fixture = TestBed.createComponent(ButtonTypeTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.directive(Button))
    expect(getClassName(buttons[0])).toBe(`${btnPrefix}`)
    expect(getClassName(buttons[1])).toBe(`${btnPrefix}`)
    expect(getClassName(buttons[2])).toBe(`${btnPrefix} ${btnPrefix}-primary`)
    expect(getClassName(buttons[3])).toBe(`${btnPrefix} ${btnPrefix}-dashed`)
    expect(getClassName(buttons[4])).toBe(`${btnPrefix} ${btnPrefix}-danger`)
    expect(getClassName(buttons[5])).toBe(`${btnPrefix} ${btnPrefix}-primary`)
  }))

  it('should set size classes properly', async(() => {
    const fixture = TestBed.createComponent(ButtonSizeTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.directive(Button))
    expect(getClassName(buttons[0])).toBe(`${btnPrefix}`)
    expect(getClassName(buttons[1])).toBe(`${btnPrefix}`)
    expect(getClassName(buttons[2])).toBe(`${btnPrefix} ${btnPrefix}-lg`)
    expect(getClassName(buttons[3])).toBe(`${btnPrefix} ${btnPrefix}-sm`)
  }))

  it('should set loading classes properly', async(() => {
    const fixture = TestBed.createComponent(ButtonLoadingTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.directive(Button))
    expect(getClassName(buttons[0])).toBe(`${btnPrefix}`)
    expect(getClassName(buttons[1])).toBe(`${btnPrefix} ${btnPrefix}-loading`)
    expect(getClassName(buttons[2])).toBe(`${btnPrefix} ${btnPrefix}-loading`)
    expect(getClassName(buttons[3])).toBe(`${btnPrefix}`)
    expect(getClassName(buttons[4])).toBe(`${btnPrefix} ${btnPrefix}-loading`)
    expect(getClassName(buttons[5])).toBe(`${btnPrefix}`)
  }))

  it('should set icon classes properly', async(() => {
    const fixture = TestBed.createComponent(ButtonIconTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.directive(Button))
    const icons = buttons.map(button => button.query(By.directive(Icon)))
    expect(getClassName(buttons[0])).toBe(`${btnPrefix}`)
    expect(icons[0]).toBeNull()
    expect(getClassName(buttons[1])).toBe(`${btnPrefix}`)
    expect(getClassName(icons[1])).toBe(`${iconPrefix} ${iconPrefix}-search`)
    expect(getClassName(buttons[2])).toBe(`${btnPrefix} ${btnPrefix}-circle ${btnPrefix}-icon-only`)
    expect(getClassName(icons[2])).toBe(`${iconPrefix} ${iconPrefix}-search`)
    expect(getClassName(buttons[3])).toBe(`${btnPrefix} ${btnPrefix}-icon-only`)
    expect(getClassName(icons[3])).toBe(`${iconPrefix} ${iconPrefix}-search`)
    expect(getClassName(buttons[4])).toBe(`${btnPrefix} ${btnPrefix}-icon-only`)
    expect(getClassName(icons[4])).toBe(`${iconPrefix} ${iconPrefix}-search`)
  }))

  it('should set ghost classes properly', async(() => {
    const fixture = TestBed.createComponent(ButtonGhostTest)
    fixture.detectChanges()

    const buttons = fixture.debugElement.queryAll(By.directive(Button))
    expect(getClassName(buttons[0])).toBe(`${btnPrefix}`)
    expect(getClassName(buttons[1])).toBe(`${btnPrefix} ${btnPrefix}-background-ghost`)
    expect(getClassName(buttons[2])).toBe(`${btnPrefix} ${btnPrefix}-background-ghost`)
    expect(getClassName(buttons[3])).toBe(`${btnPrefix}`)
    expect(getClassName(buttons[4])).toBe(`${btnPrefix} ${btnPrefix}-background-ghost`)
    expect(getClassName(buttons[5])).toBe(`${btnPrefix}`)
  }))

})

@Component({
  template: `
    <button antBtn>Default</button>
    <button antBtn color="default">Default</button>
    <button antBtn color="primary">Primary</button>
    <button antBtn color="dashed">Dashed</button>
    <button antBtn color="danger">Danger</button>
    <button antBtn="primary">Primary</button>
  `
})
class ButtonTypeTest { }

@Component({
  template: `
    <button antBtn>Default</button>
    <button antBtn size="default">Default</button>
    <button antBtn size="large">Large</button>
    <button antBtn size="small">Small</button>
  `
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
  `
})
class ButtonLoadingTest { }

@Component({
  template: `
    <button antBtn>Default</button>
    <button antBtn icon="search">Search</button>
    <button antBtn icon="search" shape="circle">Search</button>
    <button antBtn icon="search"></button>
    <button antBtn icon="search">
    </button>
  `
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
  `
})
class ButtonGhostTest { }
