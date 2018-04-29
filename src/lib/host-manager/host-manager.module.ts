import { LayoutModule } from '@angular/cdk/layout'
import { NgModule } from '@angular/core'
import { HostManagerFactory } from './host-manager'

@NgModule({
  imports: [ LayoutModule ],
  providers: [ HostManagerFactory ],
})
export class HostManagerModule { }
