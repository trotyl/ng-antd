import { Directive, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core'
import { HostManager } from '../host-manager/host-manager'

const prefix = 'ant-menu-item-group'

@Directive({
  selector: '[antMenuItemGroup]',
  exportAs: 'antMenuItemGroup',
  providers: [
    HostManager,
  ],
})
export class ItemGroup implements OnChanges, OnInit {
  @Input() key: string

  @Input()
  set antMenuItem(value: string | '') {
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
