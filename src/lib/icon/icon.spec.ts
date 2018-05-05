import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { assertClass } from '../testing/helper'
import { Icon } from './icon'
import { IconModule } from './icon.module'

describe('Icon', () => {
  const px = 'anticon'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ IconModule ],
      declarations: [
        IconStaticTest,
        IconTypeTest,
        IconSpinTest,
        IconErrorNoTypeTest,
      ],
    }).compileComponents()
  })

  it('should set type classes properly', () => {
    const fixture = TestBed.createComponent(IconTypeTest)
    fixture.detectChanges()

    const icons = fixture.debugElement.queryAll(By.directive(Icon))

    assertClass(icons[0], [`${px}-search`])
    assertClass(icons[1], [`${px}-search`])
  })

  it('should set spin classes properly', () => {
    const fixture = TestBed.createComponent(IconSpinTest)
    fixture.detectChanges()

    const icons = fixture.debugElement.queryAll(By.directive(Icon))

    assertClass(icons[0], [`${px}-search`])
    assertClass(icons[1], [`${px}-search`, `${px}-spin`])
    assertClass(icons[2], [`${px}-search`, `${px}-spin`])
    assertClass(icons[3], [`${px}-search`])
    assertClass(icons[4], [`${px}-search`, `${px}-spin`])
    assertClass(icons[5], [`${px}-search`])
    assertClass(icons[6], [`${px}-loading`, `${px}-spin`])
  })

  it('should report error when type not set', () => {
    const fixture = TestBed.createComponent(IconErrorNoTypeTest)
    expect(() => fixture.detectChanges()).toThrowError(/antIcon: requires 'type'/)
  })

})

@Component({
  template: `
    <i antIcon type="search"></i>
    <i antIcon="search"></i>
  `,
})
class IconStaticTest { }

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
class IconErrorNoTypeTest { }
