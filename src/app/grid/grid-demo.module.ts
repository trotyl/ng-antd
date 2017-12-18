import { NgModule, Type } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GridModule } from '../lib-proxy'
import { GridDemoBasic } from './grid-demo-basic'
import { GridDemoGutter } from './grid-demo-gutter'
import { GridDemoOffset } from './grid-demo-offset'
import { GridDemoSort } from './grid-demo-sort'
import { GridDemoFlex } from './grid-demo-flex'
import { GridDemoFlexAlign } from './grid-demo-flex-align'
import { GridDemoResponsive } from './grid-demo-responsive'
import { GridDemoResponsiveMore } from './grid-demo-responsive-more'
import { GridDemoPlayground } from './grid-demo-playground'

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
  declarations: [ TYPES ],
  imports: [ NG_MODULES ],
  exports: [ NG_MODULES, TYPES ],
})
export class GridDemoModule { }
