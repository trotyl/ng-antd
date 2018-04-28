import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getClassName } from '../testing/helper'
import { Icon } from './icon'
import { IconModule } from './icon.module'

describe('Icon', () => {
  const iconPrefix = 'anticon'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ IconModule ],
      declarations: [
        IconTypeTest,
        IconSpinTest,
        IconErrorTypeTest,
      ],
    }).compileComponents()
  })

  it('should set type classes properly', () => {
    const fixture = TestBed.createComponent(IconTypeTest)
    fixture.detectChanges()

    const icons = fixture.debugElement.queryAll(By.directive(Icon))
    expect(getClassName(icons[0])).toBe(`${iconPrefix} ${iconPrefix}-search`)
    expect(getClassName(icons[1])).toBe(`${iconPrefix} ${iconPrefix}-search`)
  })

  it('should set spin classes properly', () => {
    const fixture = TestBed.createComponent(IconSpinTest)
    fixture.detectChanges()

    const icons = fixture.debugElement.queryAll(By.directive(Icon))
    expect(getClassName(icons[0])).toBe(`${iconPrefix} ${iconPrefix}-search`)
    expect(getClassName(icons[1])).toBe(`${iconPrefix} ${iconPrefix}-search ${iconPrefix}-spin`)
    expect(getClassName(icons[2])).toBe(`${iconPrefix} ${iconPrefix}-search ${iconPrefix}-spin`)
    expect(getClassName(icons[3])).toBe(`${iconPrefix} ${iconPrefix}-search`)
    expect(getClassName(icons[4])).toBe(`${iconPrefix} ${iconPrefix}-search ${iconPrefix}-spin`)
    expect(getClassName(icons[5])).toBe(`${iconPrefix} ${iconPrefix}-search`)
    expect(getClassName(icons[6])).toBe(`${iconPrefix} ${iconPrefix}-loading ${iconPrefix}-spin`)
  })

  it('should report error when type not set', () => {
    const fixture = TestBed.createComponent(IconErrorTypeTest)
    expect(() => fixture.detectChanges()).toThrowError(/Antd: icon must have a type/)
  })

})

@Component({
  template: `
    <i antIcon type="search"></i>
    <i antIcon="search"></i>
  `,
})
class IconTypeTest { }

@Component({
  template: `
    <i antIcon type="search"></i>
    <i antIcon type="search" spin></i>
    <i antIcon type="search" spin="true"></i>
    <i antIcon type="search" spin="false"></i>
    <i antIcon type="search" [spin]="true"></i>
    <i antIcon type="search" [spin]="false"></i>
    <i antIcon type="loading"></i>
  `,
})
class IconSpinTest { }

@Component({
  template: `
    <i antIcon></i>
  `,
})
class IconErrorTypeTest { }
