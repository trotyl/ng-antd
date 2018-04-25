import { Injectable, Optional, Self } from '@angular/core'
import { NgClass, NgStyle } from '@angular/common'

@Injectable()
export class HostElement {
  private _classes: string | string[] | Set<string> | {[klass: string]: any}
  private _styles: {[key: string]: string}

  constructor(
    @Self() @Optional() private ngClassDir?: NgClass,
    @Self() @Optional() private ngStyleDir?: NgStyle,
  ) { }

  set classes(value: string | string[] | Set<string> | {[klass: string]: any}) {
    this.assertNgClass()
    this._classes = value
    this.ngClassDir!.ngClass = value
    this.ngClassDir!.ngDoCheck()
  }

  get classes() {
    return this._classes
  }

  set styles(value: {[key: string]: string}) {
    this.assertNgStyle()
    this._styles = value
    this.ngStyleDir!.ngStyle = value
    this.ngStyleDir!.ngDoCheck()
  }

  get styles() {
    return this._styles
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
