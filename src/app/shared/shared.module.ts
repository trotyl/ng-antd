import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AlertModule, ButtonModule, GridModule, IconModule, LayoutModule, MenuModule, RadioModule, SliderModule } from 'ng-antd'

const ANT_MODULES = [
  AlertModule,
  ButtonModule,
  GridModule,
  IconModule,
  LayoutModule,
  MenuModule,
  RadioModule,
  SliderModule,
]

@NgModule({
  exports: [ CommonModule, FormsModule, RouterModule, ANT_MODULES ],
})
export class DocsSharedModule { }
