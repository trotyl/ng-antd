import { NgClass, NgStyle } from '@angular/common'
import { ElementRef, Injectable, Optional, Renderer2, Self } from '@angular/core'

@Injectable()
export class HostElement {
  private _classes: string | string[] | Set<string> | {[klass: string]: any}
  private _styles: {[key: string]: string}

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    @Self() @Optional() private ngClassDir?: NgClass,
    @Self() @Optional() private ngStyleDir?: NgStyle,
  ) { }

  set classes(value: string | string[] | Set<string> | {[klass: string]: any}) {
    this.assertNgClass()
    this._classes = value
    this.ngClassDir!.ngClass = value
    this.ngClassDir!.ngDoCheck()
  }

  get classes(): string | string[] | Set<string> | {[klass: string]: any} {
    return this._classes
  }

  set styles(value: {[key: string]: string}) {
    this.assertNgStyle()
    this._styles = value
    this.ngStyleDir!.ngStyle = value
    this.ngStyleDir!.ngDoCheck()
  }

  get styles(): {[key: string]: string} {
    return this._styles
  }

  addClass(name: string): void {
    this.renderer.addClass(this.element.nativeElement, name)
  }

  private assertNgClass(): void {
    if (!this.ngClassDir) {
      throw new Error('No NgClass available!')
    }
  }

  private assertNgStyle(): void {
    if (!this.ngStyleDir) {
      throw new Error('No NgStyle available!')
    }
  }
}
