import { NgModule } from '@angular/core'
import { Content } from './content'
import { Footer } from './footer'
import { Header } from './header'

const TYPES = [
  Header,
  Content,
  Footer,
]

@NgModule({
  declarations: [ TYPES ],
  exports: [ TYPES ],
})
export class FragmentModule { }
