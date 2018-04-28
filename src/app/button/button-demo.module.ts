import { NgModule, Type } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule, DropdownModule, IconModule, MenuModule, RadioModule } from 'ng-antd'
import { SharedModule } from '../shared/shared.module'
import { ButtonDemoBasic } from './button-demo-basic'
import { ButtonDemoButtonGroup } from './button-demo-button-group'
import { ButtonDemoDisabled } from './button-demo-disabled'
import { ButtonDemoGhost } from './button-demo-ghost'
import { ButtonDemoIcon } from './button-demo-icon'
import { ButtonDemoLoading } from './button-demo-loading'
import { ButtonDemoMultiple } from './button-demo-multiple'
import { ButtonDemoSize } from './button-demo-size'
import { ButtonDemos } from './button-demos'

const TYPES: Type<any>[] = [
  ButtonDemoBasic,
  ButtonDemoSize,
  ButtonDemoLoading,
  ButtonDemoButtonGroup,
  ButtonDemoIcon,
  ButtonDemoDisabled,
  ButtonDemoMultiple,
  ButtonDemoGhost,
]

const NG_MODULES: Type<any>[] = [
  ButtonModule,
  DropdownModule,
  IconModule,
  MenuModule,
  RadioModule,
]

@NgModule({
  declarations: [ TYPES, ButtonDemos ],
  imports: [ FormsModule, SharedModule, NG_MODULES ],
  exports: [ TYPES ],
})
export class ButtonDemoModule { }
