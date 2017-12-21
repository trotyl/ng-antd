import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CoreModule } from 'ng-antd/core'
import { Row } from './row'
import { Column } from './column'

const TYPES = [
  Row,
  Column,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ CommonModule, CoreModule ],
  exports: [ TYPES, CoreModule ],
})
export class GridModule { }
