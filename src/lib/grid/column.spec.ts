import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs/observable/of'
import { Responsive } from '../responsive/responsive'
import { getClassName, getStyle } from '../testing/helper'
import { Column } from './column'
import { GridModule } from './grid.module'

describe('Column', () => {
  const colPrefix = 'ant-col'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GridModule ],
      declarations: [
        ColSpanTest,
        ColSpanResponsiveTest,
        ColGutterTest,
        ColGutterResponsiveTest,
        ColOffsetTest,
        ColOffsetResponsiveTest,
        ColPullTest,
        ColPullResponsiveTest,
        ColPushTest,
        ColPushResponsiveTest,
        ColOrderTest,
        ColOrderResponsiveTest,
        ColAttributeSelectorTest,
        ColErrorSpanTest,
      ],
      providers: [
        { provide: Responsive, useValue: { resolve: (opt: any, dg: any) => of(opt.md || dg()) } },
      ],
    }).compileComponents()
  })

  it('should set span classes properly', () => {
    const fixture = TestBed.createComponent(ColSpanTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getClassName(cols[0])).toBe(`${colPrefix} ${colPrefix}-0`)
    expect(getClassName(cols[1])).toBe(`${colPrefix} ${colPrefix}-1`)
    expect(getClassName(cols[2])).toBe(`${colPrefix} ${colPrefix}-4`)
    expect(getClassName(cols[3])).toBe(`${colPrefix} ${colPrefix}-6`)
  })

  it('should set span classes when responsive properly', () => {
    const fixture = TestBed.createComponent(ColSpanResponsiveTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getClassName(cols[0])).toBe(`${colPrefix} ${colPrefix}-6`)
  })

  it('should set gutter styles properly', () => {
    const fixture = TestBed.createComponent(ColGutterTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getStyle(cols[0])).toEqual({ 'padding-left': '8px', 'padding-right': '8px' })
  })

  it('should set gutter styles when responsive properly', () => {
    const fixture = TestBed.createComponent(ColGutterResponsiveTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getStyle(cols[0])).toEqual({ 'padding-left': '12px', 'padding-right': '12px' })
  })

  it('should set offset classes properly', () => {
    const fixture = TestBed.createComponent(ColOffsetTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getClassName(cols[0])).toBe(`${colPrefix} ${colPrefix}-6 ${colPrefix}-offset-4`)
  })

  it('should set offset classes when responsive properly', () => {
    const fixture = TestBed.createComponent(ColOffsetResponsiveTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getClassName(cols[0])).toBe(`${colPrefix} ${colPrefix}-6 ${colPrefix}-offset-8`)
  })

  it('should set pull classes properly', () => {
    const fixture = TestBed.createComponent(ColPullTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getClassName(cols[0])).toBe(`${colPrefix} ${colPrefix}-6 ${colPrefix}-pull-4`)
  })

  it('should set pull classes when responsive properly', () => {
    const fixture = TestBed.createComponent(ColPullResponsiveTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getClassName(cols[0])).toBe(`${colPrefix} ${colPrefix}-6 ${colPrefix}-pull-8`)
  })

  it('should set push classes properly', () => {
    const fixture = TestBed.createComponent(ColPushTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getClassName(cols[0])).toBe(`${colPrefix} ${colPrefix}-6 ${colPrefix}-push-4`)
  })

  it('should set push classes when responsive properly', () => {
    const fixture = TestBed.createComponent(ColPushResponsiveTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getClassName(cols[0])).toBe(`${colPrefix} ${colPrefix}-6 ${colPrefix}-push-8`)
  })

  it('should set order classes properly', () => {
    const fixture = TestBed.createComponent(ColOrderTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getClassName(cols[0])).toBe(`${colPrefix} ${colPrefix}-6 ${colPrefix}-order-4`)
  })

  it('should set order classes when responsive properly', () => {
    const fixture = TestBed.createComponent(ColOrderResponsiveTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getClassName(cols[0])).toBe(`${colPrefix} ${colPrefix}-6 ${colPrefix}-order-8`)
  })

  it('should support attribute selector usage', () => {
    const fixture = TestBed.createComponent(ColAttributeSelectorTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))
    expect(getClassName(cols[0])).toBe(`${colPrefix} ${colPrefix}-1`)
    expect(getClassName(cols[1])).toBe(`${colPrefix} ${colPrefix}-2`)
    expect(getClassName(cols[2])).toBe(`${colPrefix} ${colPrefix}-1`)
  })

  it('should report error when span not set', () => {
    const fixture = TestBed.createComponent(ColErrorSpanTest)
    expect(() => fixture.detectChanges()).toThrowError(/Antd: the 'span' must be specified in column/)
  })

})

@Component({
  template: `
    <ant-row>
      <ant-col [span]="0"></ant-col>
      <ant-col [span]="1"></ant-col>
      <ant-col [span]="4"></ant-col>
      <ant-col [span]="6"></ant-col>
    </ant-row>
  `,
})
class ColSpanTest { }

@Component({
  template: `
    <ant-row>
      <ant-col [span]="4" [span.md]="6"></ant-col>
    </ant-row>
  `,
})
class ColSpanResponsiveTest { }

@Component({
  template: `
    <ant-row [gutter]="16">
      <ant-col [span]="6"></ant-col>
    </ant-row>
  `,
})
class ColGutterTest { }

@Component({
  template: `
    <ant-row [gutter]="16" [gutter.md]="24">
      <ant-col [span]="6"></ant-col>
    </ant-row>
  `,
})
class ColGutterResponsiveTest { }

@Component({
  template: `
    <ant-row>
      <ant-col [span]="6" [offset]="4"></ant-col>
    </ant-row>
  `,
})
class ColOffsetTest { }

@Component({
  template: `
    <ant-row>
      <ant-col [span]="6" [offset]="4" [offset.md]="8"></ant-col>
    </ant-row>
  `,
})
class ColOffsetResponsiveTest { }

@Component({
  template: `
    <ant-row>
      <ant-col [span]="6" [pull]="4"></ant-col>
    </ant-row>
  `,
})
class ColPullTest { }

@Component({
  template: `
    <ant-row>
      <ant-col [span]="6" [pull]="4" [pull.md]="8"></ant-col>
    </ant-row>
  `,
})
class ColPullResponsiveTest { }

@Component({
  template: `
    <ant-row>
      <ant-col [span]="6" [push]="4"></ant-col>
    </ant-row>
  `,
})
class ColPushTest { }

@Component({
  template: `
    <ant-row>
      <ant-col [span]="6" [push]="4" [push.md]="8"></ant-col>
    </ant-row>
  `,
})
class ColPushResponsiveTest { }

@Component({
  template: `
    <ant-row>
      <ant-col [span]="6" [order]="4"></ant-col>
    </ant-row>
  `,
})
class ColOrderTest { }

@Component({
  template: `
    <ant-row>
      <ant-col [span]="6" [order]="4" [order.md]="8"></ant-col>
    </ant-row>
  `,
})
class ColOrderResponsiveTest { }

@Component({
  template: `
    <ant-row>
      <div antCol [span]="1"></div>
      <div antCol [span]="2"></div>
      <div [antCol]="1"></div>
    </ant-row>
  `,
})
class ColAttributeSelectorTest { }

@Component({
  template: `
    <ant-row>
      <ant-col></ant-col>
    </ant-row>
  `,
})
class ColErrorSpanTest { }
