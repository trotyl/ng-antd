import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core'
import { Menu } from 'ng-antd'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  @ViewChild(Menu) menu: Menu

  title = 'app'
  activeMenuItem = 'button'

  items = [
    { type: 'general', components: ['button', 'icon'] },
    { type: 'layout', components: ['grid', 'layout'] },
    { type: 'navigation', components: ['menu'] },
    { type: 'feedback', components: ['alert'] },
  ]

  ngOnInit(): void {
    this.menu.open('components')
  }
}
