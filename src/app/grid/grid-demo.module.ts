import { NgModule, Type } from '@angular/core'
import { GridModule } from '../lib-proxy'
import { GridDemoBasic } from './grid-demo-basic'
import { GridDemoGutter } from './grid-demo-gutter'
import { GridDemoOffset } from './grid-demo-offset'

const TYPES: Type<any>[] = [
  GridDemoBasic,
  GridDemoGutter,
  GridDemoOffset,
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
