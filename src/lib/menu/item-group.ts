import { ChangeDetectionStrategy, Component, Host, Inject, Input, OnDestroy, OnInit, Optional, Self, TemplateRef, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'
import { Governor } from '../extension/governor'
import { assert } from '../util/debug'
import { Menu } from './menu'
import { MENU_PREFIX, TemplateOutlet } from './token'

@Component({
  selector: '[antMenuItemGroup]',
  templateUrl: './item-group.html',
  exportAs: 'antMenuItemGroup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MenuItemGroup implements OnDestroy, OnInit {
  @Input() antMenuItemGroup: string | ''
  @Input() key: string
  @Input() title: string

  @ViewChild('titleTemplate') titleTemplate: TemplateRef<void>

  onInit$ = new Subject<void>()
  onDestroy$ = new Subject<void>()

  constructor(
    @Inject(MENU_PREFIX) basePrefix: string,
    @Optional() @Self() governor: Governor,
    @Optional() @Host() menu: Menu,
  ) {
    /*@__PURE__*/checkDeps(menu)

    const container = menu.containers.shift()
    /*@__PURE__*/checkOutlet(container!)

    const prefix = `${basePrefix}-item-group-list`
    governor.configureStaticClasses([ prefix ])

    const mount$ = this.onInit$.pipe(
      tap(() => container!.mount(this.titleTemplate)),
    )

    const status$ = mount$.pipe(
      takeUntil(this.onDestroy$),
    )

    status$.subscribe()
  }

  ngOnInit(): void { this.onInit$.next() }
  ngOnDestroy(): void { this.onDestroy$.next() }
}

function checkDeps(menu: Menu | null): void {
  assert(`antMenuItemGroup: missing 'antMenu' in scope`, !menu)
}

function checkOutlet(container: TemplateOutlet | null): void {
  assert(`antMenuItemGroup: missing 'antContent' in scope`, !container)
}
