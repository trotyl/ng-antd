import { NgModule } from '@angular/core'
import { ResponsiveModule } from '../responsive/responsive.module'
import { Row } from './row'
import { Column } from './column'

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
