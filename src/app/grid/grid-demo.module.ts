import { CommonModule } from '@angular/common'
import { NgModule, Type } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { GridModule, SliderModule } from 'ng-antd'
import { SharedModule } from '../shared/shared.module'
import { GridDemoBasic } from './grid-demo-basic'
import { GridDemoFlex } from './grid-demo-flex'
import { GridDemoFlexAlign } from './grid-demo-flex-align'
import { GridDemoFlexOrder } from './grid-demo-flex-order'
import { GridDemoGutter } from './grid-demo-gutter'
import { GridDemoOffset } from './grid-demo-offset'
import { GridDemoPlayground } from './grid-demo-playground'
import { GridDemoResponsive } from './grid-demo-responsive'
import { GridDemoResponsiveMore } from './grid-demo-responsive-more'
import { GridDemoSort } from './grid-demo-sort'
import { GridDemos } from './grid-demos'

const TYPES: Type<any>[] = [
  GridDemoBasic,
  GridDemoGutter,
  GridDemoOffset,
  GridDemoSort,
  GridDemoFlex,
  GridDemoFlexAlign,
  GridDemoFlexOrder,
  GridDemoResponsive,
  GridDemoResponsiveMore,
  GridDemoPlayground,
]

const NG_MODULES: Type<any>[] = [
  CommonModule,
  GridModule,
  SliderModule,
]

@NgModule({
  declarations: [ TYPES, GridDemos ],
  imports: [ FormsModule, SharedModule, NG_MODULES ],
  exports: [ TYPES ],
})
export class GridDemoModule { }
