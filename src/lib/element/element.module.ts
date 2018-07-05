import { NgModule } from '@angular/core'
import { AsideElement, FooterElement, HeaderElement, LiElement, MainElement } from './element'

@NgModule({
  declarations: [ AsideElement ],
  exports: [ AsideElement ],
})
export class AsideElementModule { }

@NgModule({
  declarations: [ FooterElement ],
  exports: [ FooterElement ],
})
export class FooterElementModule { }

@NgModule({
  declarations: [ HeaderElement ],
  exports: [ HeaderElement ],
})
export class HeaderElementModule { }

@NgModule({
  declarations: [ LiElement ],
  exports: [ LiElement ],
})
export class LiElementModule { }

@NgModule({
  declarations: [ MainElement ],
  exports: [ MainElement ],
})
export class MainElementModule { }
