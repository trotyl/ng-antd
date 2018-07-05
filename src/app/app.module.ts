import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { AlertModule, ButtonModule, GridModule, IconModule, LayoutModule, MenuModule } from 'ng-antd'

import { AlertDemos, AlertDemoModule } from './alert'
import { AppComponent } from './app.component'
import { ButtonDemos, ButtonDemoModule } from './button'
import { GridDemos, GridDemoModule } from './grid'
import { IconDemos, IconDemoModule } from './icon'
import { LayoutDemos, LayoutDemoModule } from './layout'
import { MenuDemos, MenuDemoModule } from './menu'

const ANT_MODULES = [
  AlertModule,
  ButtonModule,
  GridModule,
  IconModule,
  LayoutModule,
  MenuModule,
]

const DEMO_MODULES = [
  AlertDemoModule,
  ButtonDemoModule,
  IconDemoModule,
  GridDemoModule,
  LayoutDemoModule,
  MenuDemoModule,
]

const routes: Routes = [
  { path: 'alert', component: AlertDemos },
  { path: 'button', component: ButtonDemos },
  { path: 'icon', component: IconDemos },
  { path: 'grid', component: GridDemos },
  { path: 'layout', component: LayoutDemos },
  { path: 'menu', component: MenuDemos },
  { path: '', redirectTo: '/button', pathMatch: 'full' },
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
    ANT_MODULES,
    DEMO_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
