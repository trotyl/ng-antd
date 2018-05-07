import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs/observable/of'
import { Responsive } from '../responsive/responsive'
import { assertClass, assertStyle } from '../testing/helper'
import { Column } from './column'
import { GridModule } from './grid.module'

describe('Column', () => {
  const px = 'ant-col'

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
        ColErrorNoRowTest,
        ColErrorNoSpanTest,
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

    assertClass(cols[0], [`${px}-0`])
    assertClass(cols[1], [`${px}-1`])
    assertClass(cols[2], [`${px}-4`])
    assertClass(cols[3], [`${px}-6`])
  })

  it('should set span classes when responsive properly', () => {
    const fixture = TestBed.createComponent(ColSpanResponsiveTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))

    assertClass(cols[0], [`${px}-6`])
  })

  it('should set gutter styles properly', () => {
    const fixture = TestBed.createComponent(ColGutterTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))

    assertStyle(cols[0], { 'padding-left': '8px', 'padding-right': '8px' })
  })

  it('should set gutter styles when responsive properly', () => {
    const fixture = TestBed.createComponent(ColGutterResponsiveTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))

    assertStyle(cols[0], { 'padding-left': '12px', 'padding-right': '12px' })
  })

  it('should set offset classes properly', () => {
    const fixture = TestBed.createComponent(ColOffsetTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))

    assertClass(cols[0], [`${px}-offset-4`])
  })

  it('should set offset classes when responsive properly', () => {
    const fixture = TestBed.createComponent(ColOffsetResponsiveTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))

    assertClass(cols[0], [`${px}-offset-8`])
  })

  it('should set pull classes properly', () => {
    const fixture = TestBed.createComponent(ColPullTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))

    assertClass(cols[0], [`${px}-pull-4`])
  })

  it('should set pull classes when responsive properly', () => {
    const fixture = TestBed.createComponent(ColPullResponsiveTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))

    assertClass(cols[0], [`${px}-pull-8`])
  })

  it('should set push classes properly', () => {
    const fixture = TestBed.createComponent(ColPushTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))

    assertClass(cols[0], [`${px}-push-4`])
  })

  it('should set push classes when responsive properly', () => {
    const fixture = TestBed.createComponent(ColPushResponsiveTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))

    assertClass(cols[0], [`${px}-push-8`])
  })

  it('should set order classes properly', () => {
    const fixture = TestBed.createComponent(ColOrderTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))

    assertClass(cols[0], [`${px}-order-4`])
  })

  it('should set order classes when responsive properly', () => {
    const fixture = TestBed.createComponent(ColOrderResponsiveTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))

    assertClass(cols[0], [`${px}-order-8`])
  })

  it('should support attribute selector usage', () => {
    const fixture = TestBed.createComponent(ColAttributeSelectorTest)
    fixture.detectChanges()

    const cols = fixture.debugElement.queryAll(By.directive(Column))

    assertClass(cols[0], [`${px}-1`])
    assertClass(cols[1], [`${px}-2`])
    assertClass(cols[2], [`${px}-1`])
  })

  it('should report error when not inside a row', () => {
    expect(() => TestBed.createComponent(ColErrorNoRowTest)).toThrowError(/antCol: missing 'antRow' in scope/)
  })

  it('should report error when span not set', () => {
    const fixture = TestBed.createComponent(ColErrorNoSpanTest)
    expect(() => fixture.detectChanges()).toThrowError(/antCol: missing 'span' input/)
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
      <ant-col [span]="4" [span.xs]="2" [span.sm]="2" [span.md]="6" [span.lg]="2" [span.xl]="2" [span.xxl]="2"></ant-col>
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
    <ant-row [gutter]="16" [gutter.xs]="32" [gutter.sm]="32" [gutter.md]="24" [gutter.lg]="32" [gutter.xl]="32" [gutter.xxl]="32">
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
      <ant-col [span]="6" [offset]="4" [offset.xs]="2" [offset.sm]="2" [offset.md]="8" [offset.lg]="2" [offset.xl]="2" [offset.xxl]="2"></ant-col>
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
      <ant-col [span]="6" [pull]="4" [pull.xs]="2" [pull.sm]="2" [pull.md]="8" [pull.lg]="2" [pull.xl]="2" [pull.xxl]="2"></ant-col>
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
      <ant-col [span]="6" [push]="4" [push.xs]="2" [push.sm]="2" [push.md]="8" [push.lg]="2" [push.xl]="2" [push.xxl]="2"></ant-col>
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
    <ant-col [span]="6" [order]="4" [order.xs]="2" [order.sm]="2" [order.md]="8" [order.lg]="2" [order.xl]="2" [order.xxl]="2"></ant-col>
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
    <ant-col></ant-col>
  `,
})
class ColErrorNoRowTest { }

@Component({
  template: `
    <ant-row>
      <ant-col></ant-col>
    </ant-row>
  `,
})
class ColErrorNoSpanTest { }
