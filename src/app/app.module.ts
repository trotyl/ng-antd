import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DocsComponentsModule } from './components'
import { SiteHomeModule } from './home'
import { SiteLayoutModule } from './layout'
import { SiteMainModule } from './main'
import { SiteSharedModule } from './shared'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SiteLayoutModule,
    SiteSharedModule,
    SiteHomeModule,
    SiteMainModule,
    DocsComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
