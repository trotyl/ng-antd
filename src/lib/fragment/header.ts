import { Directive, Injector, TemplateRef } from '@angular/core'

@Directive({
  selector: '[antHeader]',
})
export class Header {
  constructor(
    public injector: Injector,
    public template: TemplateRef<void>,
  ) { }
}
