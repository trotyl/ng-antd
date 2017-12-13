import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ButtonModule, DropdownModule, IconModule, MenuModule, RadioModule } from '../lib-proxy'
import { ButtonDemoBasic } from './button-demo-basic'
import { ButtonDemoSize } from './button-demo-size'
import { ButtonDemoLoading } from './button-demo-loading'
import { ButtonDemoButtonGroup } from './button-demo-button-group'
import { ButtonDemoIcon } from './button-demo-icon'
import { ButtonDemoDisabled } from './button-demo-disabled'
import { ButtonDemoMultiple } from './button-demo-multiple'
import { ButtonDemoGhost } from './button-demo-ghost'

const TYPES = [
  ButtonDemoBasic,
  ButtonDemoSize,
  ButtonDemoLoading,
  ButtonDemoButtonGroup,
  ButtonDemoIcon,
  ButtonDemoDisabled,
  ButtonDemoMultiple,
  ButtonDemoGhost,
]

const NG_MODULES = [
  ButtonModule,
  DropdownModule,
  IconModule,
  MenuModule,
  RadioModule,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ NG_MODULES ],
  exports: [ NG_MODULES, TYPES ],
})
export class ButtonDemoModule { }
