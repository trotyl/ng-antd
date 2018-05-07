import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ExtensionModule } from '../extension/extension.module'
import { Icon } from './icon'
import { ICON_PREFIX } from './token'

const TYPES = [
  Icon,
]

const NG_MODULES = [
  ExtensionModule,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [
    CommonModule,
    NG_MODULES,
  ],
  exports: [ TYPES, NG_MODULES ],
  providers: [
    { provide: ICON_PREFIX, useValue: 'anticon' },
  ],
})
export class IconModule { }
