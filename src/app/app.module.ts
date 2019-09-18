import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DocsComponentsModule } from './components'
import { DocsInfraModule } from './infra'
import { DocsSharedModule } from './shared'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DocsSharedModule,
    DocsComponentsModule,
    DocsInfraModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
