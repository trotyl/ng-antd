import { isDevMode, AfterContentInit, ContentChild, Directive, Self, TemplateRef } from '@angular/core'
import { Combo } from '../combo/combo'
import { MENU_PREFIX } from '../menu/token'
import { assertExist } from '../util/debug'
import { Overlay } from './overlay'

const panelClass = ['ant-dropdown', 'ant-dropdown-placement-bottomLeft']

export function menuPrefixFactory(): string {
  return 'ant-dropdown-menu'
}

@Directive({
  selector: '[antDropdown]',
  host: {
    '[class.ant-dropdown-link]': `true`,
    '[class.ant-dropdown-trigger]': `true`,
  },
  providers: [
    Combo,
    { provide: MENU_PREFIX, useFactory: menuPrefixFactory, deps: [] },
  ],
})
export class Dropdown implements AfterContentInit {
  @ContentChild(Overlay, { read: TemplateRef }) contentOverlay: TemplateRef<void>

  constructor(
    @Self() private combo: Combo,
  ) { }

  ngAfterContentInit(): void {
    /* istanbul ignore else */
    if (isDevMode()) {
      /*@__PURE__*/assertExist(this.contentOverlay, `antDropdown: requires 'overlay'`)
    }

    this.combo.init(this.contentOverlay, panelClass)
  }
}
