import { ElementRef, Injectable, Injector, KeyValueDiffer, KeyValueDiffers, Renderer2 } from '@angular/core'

@Injectable()
export class HostManager {
  private classDiffer: KeyValueDiffer<string, boolean> | null = null
  private styleDiffer: KeyValueDiffer<string, string> | null = null

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private differs: KeyValueDiffers,
  ) { }

  set staticClasses(list: string[]) {
    list.forEach(className => this.addClass(className))
  }

  set classes(obj: { [name: string]: boolean }) {
    if (!this.classDiffer) this.classDiffer = this.differs.find(obj).create()

    const changes = this.classDiffer.diff(obj)
    if (changes) {
      changes.forEachAddedItem((record) => this.toggleClass(record.key, record.currentValue))
      changes.forEachChangedItem((record) => this.toggleClass(record.key, record.currentValue))
      changes.forEachRemovedItem((record) => {
        if (record.previousValue) {
          this.removeClass(record.key)
        }
      })
    }
  }

  set staticStyles(obj: { [key: string]: string }) {
    Object.keys(obj).forEach(key => this.setStyle(key, obj[key]))
  }

  set styles(obj: { [key: string]: string }) {
    if (!this.styleDiffer) this.styleDiffer = this.differs.find(obj).create()

    const changes = this.styleDiffer.diff(obj)
    if (changes) {
      changes.forEachRemovedItem((record) => this.removeStyle(record.key))
      changes.forEachAddedItem((record) => this.toggleStyle(record.key, record.currentValue))
      changes.forEachChangedItem((record) => this.toggleStyle(record.key, record.currentValue))
    }
  }

  addClass(className: string): void {
    this.renderer.addClass(this.el.nativeElement, className)
  }

  removeClass(className: string): void {
    this.renderer.removeClass(this.el.nativeElement, className)
  }

  setStyle(style: string, value: string): void {
    this.renderer.setStyle(this.el.nativeElement, style, value)
  }

  removeStyle(style: string): void {
    this.renderer.removeStyle(this.el.nativeElement, style)
  }

  private toggleClass(className: string, enabled: boolean | null): void {
    if (enabled) {
      this.addClass(className)
    } else {
      this.removeClass(className)
    }
  }

  private toggleStyle(style: string, value: string | null): void {
    if (value != null) {
      this.setStyle(style, value)
    } else {
      this.removeStyle(style)
    }
  }
}

@Injectable()
export class HostManagerFactory {
  create(injector: Injector): HostManager {
    return new HostManager(
      injector.get(ElementRef),
      injector.get(Renderer2),
      injector.get(KeyValueDiffers),
    )
  }
}
