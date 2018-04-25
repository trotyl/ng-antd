import { NgModule, Type } from '@angular/core'
import { ButtonModule, DropdownModule, IconModule, MenuModule, RadioModule } from 'ng-antd'
import { SharedModule } from '../shared/shared.module'
import { ButtonDemoBasic } from './button-demo-basic'
import { ButtonDemoSize } from './button-demo-size'
import { ButtonDemoLoading } from './button-demo-loading'
import { ButtonDemoButtonGroup } from './button-demo-button-group'
import { ButtonDemoIcon } from './button-demo-icon'
import { ButtonDemoDisabled } from './button-demo-disabled'
import { ButtonDemoMultiple } from './button-demo-multiple'
import { ButtonDemoGhost } from './button-demo-ghost'
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
  imports: [ SharedModule, NG_MODULES ],
  exports: [ TYPES ],
})
export class ButtonDemoModule { }
