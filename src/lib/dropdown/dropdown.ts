import { AfterContentInit, ContentChild, Directive, Optional, Self, TemplateRef } from '@angular/core'
import { Combo } from '../extension/combo'
import { MENU_PREFIX } from '../menu/token'
import { assert } from '../util/debug'
import { Overlay } from './overlay'

/* tslint:disable-next-line */
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
    { provide: MENU_PREFIX, useFactory: menuPrefixFactory, deps: [] },
  ],
})
export class Dropdown implements AfterContentInit {
  @ContentChild(Overlay, { read: TemplateRef }) contentOverlay: TemplateRef<void>

  constructor(
    @Optional() @Self() private combo: Combo,
  ) { }

  ngAfterContentInit(): void {
    /*@__PURE__*/assert(`antDropdown: requires 'overlay'`, this.contentOverlay == null)

    this.combo.configTemplate(this.contentOverlay)
  }
}
