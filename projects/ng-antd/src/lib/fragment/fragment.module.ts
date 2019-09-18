import { NgModule } from '@angular/core'
import { Content } from './content'
import { Footer } from './footer'
import { Fragment } from './fragment'
import { Header } from './header'

const TYPES = [
  Header,
  Content,
  Fragment,
  Footer,
]

@NgModule({
  declarations: [ TYPES ],
  exports: [ TYPES ],
})
export class FragmentModule { }
