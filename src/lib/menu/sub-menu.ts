import { Component, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { HostManager } from '../host-manager/host-manager'

const prefix = 'ant-menu-submenu'

@Component({
  selector: '[antSubMenu]',
  templateUrl: './sub-menu.html',
  exportAs: 'antSubMenu',
  providers: [
    HostManager,
  ],
})
export class SubMenu implements OnChanges, OnInit {
  @Input() key: string

  @Input()
  set antSubMenu(value: string | '') {
    if (value !== '') { this.key = value }
  }

  constructor(@Self() private host: HostManager) { }

  ngOnInit(): void {
    this.host.staticClasses = [ prefix ]
    this.updateHostClasses()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClasses()
  }

  private updateHostClasses(): void {
    this.host.classes = {

    }
  }
}
