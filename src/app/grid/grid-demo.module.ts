import { NgModule, Type } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GridModule } from 'ng-antd'
import { SharedModule } from '../shared/shared.module'
import { GridDemoBasic } from './grid-demo-basic'
import { GridDemoGutter } from './grid-demo-gutter'
import { GridDemoOffset } from './grid-demo-offset'
import { GridDemoSort } from './grid-demo-sort'
import { GridDemoFlex } from './grid-demo-flex'
import { GridDemoFlexAlign } from './grid-demo-flex-align'
import { GridDemoResponsive } from './grid-demo-responsive'
import { GridDemoResponsiveMore } from './grid-demo-responsive-more'
import { GridDemoPlayground } from './grid-demo-playground'
import { GridDemos } from './grid-demos'

const TYPES: Type<any>[] = [
  GridDemoBasic,
  GridDemoGutter,
  GridDemoOffset,
  GridDemoSort,
  GridDemoFlex,
  GridDemoFlexAlign,
  GridDemoResponsive,
  GridDemoResponsiveMore,
  GridDemoPlayground,
]

const NG_MODULES: Type<any>[] = [
  CommonModule,
  GridModule,
]

@NgModule({
  declarations: [ TYPES, GridDemos ],
  imports: [ SharedModule, NG_MODULES ],
  exports: [ TYPES ],
})
export class GridDemoModule { }
