import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router'
import { LayoutModule } from 'ng-antd'

import { ButtonDemos } from './button/button-demos'
import { ButtonDemoModule } from './button/button-demo.module'
import { IconDemos } from './icon/icon-demos'
import { IconDemoModule } from './icon/icon-demo.module'
import { GridDemos } from './grid/grid-demos'
import { GridDemoModule } from './grid/grid-demo.module'
import { LayoutDemos } from './layout/layout-demos'
import { LayoutDemoModule } from './layout/layout-demo.module'
import { AppComponent } from './app.component'

const DEMO_MODULES = [
  ButtonDemoModule,
  IconDemoModule,
  GridDemoModule,
  LayoutDemoModule,
]

const routes: Routes = [
  { path: 'button', component: ButtonDemos },
  { path: 'icon', component: IconDemos },
  { path: 'grid', component: GridDemos },
  { path: 'layout', component: LayoutDemos },
  { path: '', redirectTo: '/button', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    LayoutModule,
    DEMO_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
