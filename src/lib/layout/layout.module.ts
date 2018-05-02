import { NgModule } from '@angular/core'
import { AsideElementModule } from '../elements/aside.module'
import { FooterElementModule } from '../elements/footer.module'
import { HeaderElementModule } from '../elements/header.module'
import { MainElementModule } from '../elements/main.module'
import { GovernorModule } from '../governor/governor.module'
import { LayoutContent } from './content'
import { LayoutFooter } from './footer'
import { LayoutHeader } from './header'
import { Layout } from './layout'
import { LayoutSider } from './sider'
import { LAYOUT_PREFIX } from './token'

const TYPES = [
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
  LayoutSider,
]

const NG_MODULES = [
  FooterElementModule,
  HeaderElementModule,
  MainElementModule,
  AsideElementModule,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ GovernorModule ],
  exports: [ TYPES, NG_MODULES ],
  providers: [
    { provide: LAYOUT_PREFIX, useValue: 'ant-layout' },
  ],
})
export class LayoutModule { }
