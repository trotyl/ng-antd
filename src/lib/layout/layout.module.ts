import { NgModule } from '@angular/core'
import { AsideElementModule } from '../element/aside.module'
import { FooterElementModule } from '../element/footer.module'
import { HeaderElementModule } from '../element/header.module'
import { MainElementModule } from '../element/main.module'
import { ExtensionModule } from '../extension/extension.module'
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
  ExtensionModule,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ NG_MODULES ],
  exports: [ TYPES, NG_MODULES ],
  providers: [
    { provide: LAYOUT_PREFIX, useValue: 'ant-layout' },
  ],
})
export class LayoutModule { }
