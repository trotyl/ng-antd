import { NgModule } from '@angular/core'
import { ResponsiveModule } from '../responsive/responsive.module'
import { Column } from './column'
import { Row } from './row'

const TYPES = [
  Row,
  Column,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ ResponsiveModule ],
  exports: [ TYPES ],
})
export class GridModule { }
