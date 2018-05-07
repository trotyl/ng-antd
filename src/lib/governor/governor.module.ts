import { NgModule } from '@angular/core'
import { Governor, GovernorFactory } from './governor'

const TYPES = [
  Governor,
]

@NgModule({
  declarations: [ TYPES ],
  exports: [ TYPES ],
  providers: [ GovernorFactory ],
})
export class GovernorModule { }
