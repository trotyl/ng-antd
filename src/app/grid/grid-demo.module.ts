import { NgModule, Type } from '@angular/core'
import { GridModule } from '../lib-proxy'
import { GridDemoBasic } from './grid-demo-basic'
import { GridDemoGutter } from './grid-demo-gutter'
import { GridDemoOffset } from './grid-demo-offset'
import { GridDemoSort } from './grid-demo-sort'
import { GridDemoFlex } from './grid-demo-flex'

const TYPES: Type<any>[] = [
  GridDemoBasic,
  GridDemoGutter,
  GridDemoOffset,
  GridDemoSort,
  GridDemoFlex,
]

const NG_MODULES: Type<any>[] = [
  GridModule,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ NG_MODULES ],
  exports: [ NG_MODULES, TYPES ],
})
export class GridDemoModule { }
