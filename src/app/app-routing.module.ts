import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SiteHomeWrapper } from './home'
import { SiteMainWrapper } from './main/main.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SiteHomeWrapper,
  },
  {
    path: 'components/:name',
    component: SiteMainWrapper,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
