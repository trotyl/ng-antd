import { Component, HostBinding } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'

// TODO: extract to JSON file
// TODO: add support for localization
const docTitle = 'Ant Design - A UI Design Language and React UI library'
const description = 'An enterprise-class UI design language and React UI library with a set of high-quality React components, one of best React UI library for enterprises'

@Component({
  selector: '[siteLayout][container]',
  templateUrl: './layout.component.html',
})
export class SiteLayout {
  @HostBinding('class.page-wrapper') pageWrapper = true

  constructor(
    private meta: Meta,
    private title: Title,
  ) {}

  ngOnInit(): void {
    // TODO: extract to template-based definition
    this.title.setTitle(docTitle)
    this.meta.addTag({ name: 'description', content: description })
    this.meta.addTag({ property: 'og:title', content: docTitle })
    this.meta.addTag({ property: 'og:type', content: 'website' })
    this.meta.addTag({ property: 'og:image', content: 'https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png' })
  }
}
