import { Injectable, Optional, Self } from '@angular/core'
import { NgClass, NgStyle } from '@angular/common'

@Injectable()
export class HostElement {
  constructor(
    @Self() @Optional() private ngClassDir?: NgClass,
    @Self() @Optional() private ngStyleDir?: NgStyle,
  ) { }

  set classes(value: string | string[] | Set<string> | {[klass: string]: any}) {
    this.assertNgClass()
    this.ngClassDir!.ngClass = value
    this.ngClassDir!.ngDoCheck()
  }

  get classes() {
    this.assertNgClass()
    return this.ngClassDir!.ngClass
  }

  set styles(value: {[key: string]: string}) {
    this.assertNgStyle()
    this.ngStyleDir!.ngStyle = value
    this.ngStyleDir!.ngDoCheck()
  }

  get styles() {
    this.assertNgStyle()
    return this.ngStyleDir!.ngStyle
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
