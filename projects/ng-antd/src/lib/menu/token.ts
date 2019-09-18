import { InjectionToken, TemplateRef } from '@angular/core'

export const MENU_PREFIX = new InjectionToken<string>('MENU_PREFIX')

export interface TemplateOutlet {
  mount(template: TemplateRef<void>): void
}
