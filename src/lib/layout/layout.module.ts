import { NgModule } from '@angular/core'
import { AsideElementModule } from '../elements/aside'
import { FooterElementModule } from '../elements/footer'
import { HeaderElementModule } from '../elements/header'
import { MainElementModule } from '../elements/main'
import { HostManagerModule } from '../host-manager/host-manager.module'
import { Content } from './content'
import { Footer } from './footer'
import { Header } from './header'
import { Layout } from './layout'
import { Sider } from './sider'

const TYPES = [
  Layout,
  Header,
  Content,
  Footer,
  Sider,
]

const NG_MODULES = [
  FooterElementModule,
  HeaderElementModule,
  MainElementModule,
  AsideElementModule,
]

@NgModule({
  declarations: [ TYPES ],
  imports: [ HostManagerModule ],
  exports: [ TYPES, NG_MODULES ],
})
export class LayoutModule { }
