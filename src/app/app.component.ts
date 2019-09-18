import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core'
import { Meta } from '@angular/platform-browser'

const title = 'Ant Design - A UI Design Language and React UI library'
const description = 'An enterprise-class UI design language and React UI library with a set of high-quality React components, one of best React UI library for enterprises'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @HostBinding('id') id = 'react-content'

  constructor(
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    // TODO: extract to template-based definition
    this.meta.addTag({ name: 'description', content: description })
    this.meta.addTag({ property: 'og:title', content: title })
    this.meta.addTag({ property: 'og:type', content: 'website' })
    this.meta.addTag({ property: 'og:image', content: 'https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png' })
  }
}
