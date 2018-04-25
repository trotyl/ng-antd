import { Component, Attribute, ChangeDetectionStrategy } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

const API_BASE = 'https://raw.githubusercontent.com/trotyl/ng-antd/master/src/app'

@Component({
  selector: 'source-viewer',
  templateUrl: './source-viewer.component.html',
  styles: [`
    .code-block {
      margin-top: 5px;
    }
  `],
  host: { '[style.display]': `'block'` },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceViewer {
  html$: Observable<string>
  ts$: Observable<string>
  css$: Observable<string>

  constructor(
    http: HttpClient,
    @Attribute('component') component: string,
    @Attribute('demo') demo: string,
  ) {
    const path = `${API_BASE}/${component}/${component}-demo-${demo}`
    this.html$ = http.get(`${path}.html`, { responseType: 'text' })
    this.ts$ = http.get(`${path}.ts`, { responseType: 'text' })
    this.css$ = http.get(`${path}.css`, { responseType: 'text' })
  }
}
