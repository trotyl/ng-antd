import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
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
export class SourceViewer implements OnInit {
  @Input() component: string
  @Input() case: string

  html$: Observable<string>
  ts$: Observable<string>
  css$: Observable<string>

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const path = `${API_BASE}/${this.component}/${this.component}-demo-${this.case}`
    this.html$ = this.http.get(`${path}.html`, { responseType: 'text' })
    this.ts$ = this.http.get(`${path}.ts`, { responseType: 'text' })
    this.css$ = this.http.get(`${path}.css`, { responseType: 'text' })
  }
}
