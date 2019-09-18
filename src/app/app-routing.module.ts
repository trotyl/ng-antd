import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DocsContainer } from './components'

const routes: Routes = [
  { path: 'components/:name', component: DocsContainer },
  { path: '', redirectTo: '/components/button', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
