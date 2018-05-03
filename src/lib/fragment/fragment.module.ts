import { NgModule } from '@angular/core'
import { Content } from './content'
import { Footer } from './footer'
import { Header } from './header'
import { FragmentContainer, NoopFragmentContainer } from './token'

const TYPES = [
  Header,
  Content,
  Footer,
]

@NgModule({
  declarations: [ TYPES ],
  exports: [ TYPES ],
  providers: [
    { provide: FragmentContainer, useClass: NoopFragmentContainer },
  ],
})
export class FragmentModule { }
