import { NgModule } from '@angular/core'
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

@NgModule({
  declarations: [ TYPES ],
  exports: [ TYPES ],
})
export class LayoutModule { }
