import { Component } from '@angular/core'
import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getClassName } from '../testing/helper'
import { IconModule } from './icon.module'

describe('Icon', () => {
  const iconPrefix = 'anticon'

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ IconModule ],
      declarations: [
        IconTypeTest,
        IconSpinTest,
      ]
    }).compileComponents()
  }))

  it('should set type classes properly', async(() => {
    const fixture = TestBed.createComponent(IconTypeTest)
    fixture.detectChanges()

    const icons = fixture.debugElement.queryAll(By.css('i'))
    expect(getClassName(icons[0])).toBe(`${iconPrefix} ${iconPrefix}-search`)
    expect(getClassName(icons[1])).toBe(`${iconPrefix} ${iconPrefix}-search`)
  }))

  it('should set spin classes properly', async(() => {
    const fixture = TestBed.createComponent(IconSpinTest)
    fixture.detectChanges()

    const icons = fixture.debugElement.queryAll(By.css('i'))
    expect(getClassName(icons[0])).toBe(`${iconPrefix} ${iconPrefix}-search`)
    expect(getClassName(icons[1])).toBe(`${iconPrefix} ${iconPrefix}-search ${iconPrefix}-spin`)
    expect(getClassName(icons[2])).toBe(`${iconPrefix} ${iconPrefix}-search ${iconPrefix}-spin`)
    expect(getClassName(icons[3])).toBe(`${iconPrefix} ${iconPrefix}-search`)
    expect(getClassName(icons[4])).toBe(`${iconPrefix} ${iconPrefix}-search ${iconPrefix}-spin`)
    expect(getClassName(icons[5])).toBe(`${iconPrefix} ${iconPrefix}-search`)
    expect(getClassName(icons[6])).toBe(`${iconPrefix} ${iconPrefix}-loading ${iconPrefix}-spin`)
  }))


})

@Component({
  template: `
    <i antIcon type="search"></i>
    <i antIcon="search"></i>
  `
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
  `
})
class IconSpinTest { }
