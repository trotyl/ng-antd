import { Directive, Injector, TemplateRef } from '@angular/core'

@Directive({
  selector: '[antFooter]',
})
export class Footer {
  constructor(
    public injector: Injector,
    public template: TemplateRef<void>,
  ) { }
}
