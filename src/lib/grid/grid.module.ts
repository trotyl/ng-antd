import { NgModule } from '@angular/core'
import { ExtensionModule } from '../extension/extension.module'
import { ResponsiveModule } from '../responsive/responsive.module'
import { Column } from './column'
import { Row } from './row'
import { COLUMN_PREFIX, ROW_PREFIX } from './token'

const TYPES = [
  Row,
  Column,
]

const NG_MODULES = [
  ExtensionModule,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [
    ResponsiveModule,
    NG_MODULES,
  ],
  exports: [ TYPES, NG_MODULES ],
  providers: [
    { provide: COLUMN_PREFIX, useValue: 'ant-col' },
    { provide: ROW_PREFIX, useValue: 'ant-row' },
  ],
})
export class GridModule { }
