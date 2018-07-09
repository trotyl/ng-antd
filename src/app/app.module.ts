import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component'
import { DocsViewer, DocsViewerModule } from './components'
import { SharedModule } from './shared'

const routes: Routes = [
  { path: 'components/:name', component: DocsViewer },
  { path: '', redirectTo: '/components/alert', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SharedModule,
    DocsViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
