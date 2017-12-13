import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { ButtonDemoModule } from './button/button-demo.module'
import { AppComponent } from './app.component'

const DEMO_MODULES = [
  ButtonDemoModule,
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DEMO_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
