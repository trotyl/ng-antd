import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component'
import { DocsComponentsModule, DocsContainer } from './components'
import { DocsInfraModule } from './infra'
import { DocsSharedModule } from './shared'

const routes: Routes = [
  { path: 'components/:name', component: DocsContainer },
  { path: '', redirectTo: '/components/button', pathMatch: 'full' },
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
    DocsSharedModule,
    DocsComponentsModule,
    DocsInfraModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
