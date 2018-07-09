import { AfterViewInit, Attribute, Directive, ElementRef, Renderer2 } from '@angular/core'

declare var Prism: {
  highlightElement(el: any): void,
}

@Directive({
  selector: '[highlight]',
})
export class DocsHightLight implements AfterViewInit {
  constructor(
    private element: ElementRef,
    renderer: Renderer2,
    @Attribute('highlight') lang: string,
  ) {
    renderer.addClass(element.nativeElement, `language-${lang}`)
  }

  ngAfterViewInit(): void {
    Prism.highlightElement(this.element.nativeElement)
  }
}
