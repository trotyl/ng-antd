import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class AppComponent {
  title = 'app'

  items = [
    { type: 'general', components: ['button', 'icon'] },
    { type: 'layout', components: ['grid', 'layout'] },
    { type: 'navigation', components: ['menu'] },
  ]
}
