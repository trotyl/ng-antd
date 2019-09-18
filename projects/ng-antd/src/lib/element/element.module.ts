import { NgModule } from '@angular/core'
import { AsideElement, Element, FooterElement, HeaderElement, LiElement, MainElement } from './element'

@NgModule({
  declarations: [ Element ],
  exports: [ Element ],
})
export class AbstractElementModule {}

@NgModule({
  declarations: [ AsideElement ],
  exports: [ AsideElement, AbstractElementModule ],
})
export class AsideElementModule { }

@NgModule({
  declarations: [ FooterElement ],
  exports: [ FooterElement, AbstractElementModule ],
})
export class FooterElementModule { }

@NgModule({
  declarations: [ HeaderElement ],
  exports: [ HeaderElement, AbstractElementModule ],
})
export class HeaderElementModule { }

@NgModule({
  declarations: [ LiElement ],
  exports: [ LiElement, AbstractElementModule ],
})
export class LiElementModule { }

@NgModule({
  declarations: [ MainElement ],
  exports: [ MainElement, AbstractElementModule ],
})
export class MainElementModule { }
