import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Row } from './row'
import { Column } from './column'

const TYPES = [
  Row,
  Column,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule ],
  exports: [ TYPES ],
})
export class GridModule { }
