import { NgModule } from '@angular/core'
import { ResponsiveModule } from '../responsive/responsive.module'
import { Column } from './column'
import { Row } from './row'
import { COLUMN_PREFIX, ROW_PREFIX } from './token'

const TYPES = [
  Row,
  Column,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ ResponsiveModule ],
  exports: [ TYPES ],
  providers: [
    { provide: COLUMN_PREFIX, useValue: 'ant-col' },
    { provide: ROW_PREFIX, useValue: 'ant-row' },
  ],
})
export class GridModule { }
