import { NgModule } from '@angular/core'
import { FooterElementModule } from '../elements/footer'
import { HeaderElementModule } from '../elements/header'
import { MainElementModule } from '../elements/main'
import { AsideElementModule } from '../elements/aside'
import { Layout } from './layout'
import { Header } from './header'
import { Content } from './content'
import { Footer } from './footer'
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
  exports: [ TYPES, NG_MODULES ],
})
export class LayoutModule { }
