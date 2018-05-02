import { Directive, Injector, TemplateRef } from '@angular/core'

@Directive({
  selector: '[antContent]',
})
export class Content {
  constructor(
    public injector: Injector,
    public template: TemplateRef<void>,
  ) { }
}
