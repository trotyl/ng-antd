import { NgModule, Type } from '@angular/core'
import { GridModule } from '../lib-proxy'
import { GridDemoBasic } from './grid-demo-basic'

const TYPES: Type<any>[] = [
  GridDemoBasic,
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
