import { Component, HostBinding } from '@angular/core'

@Component({
  selector: 'site-home-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss'],
})
export class SiteHomePage3 {
  @HostBinding('class.home-page-wrapper') homePageWrapper = true
  @HostBinding('class.page3') page3 = true
  @HostBinding('id') id = 'page3'

  pageData = [
    {
      title: 'Ant Design Resources',
      content: 'Ant Design Resources Download',
      img: 'https://gw.alipayobjects.com/zos/rmsportal/qggKjIGNFlVmMpwDUXPU.svg',
      to: '/docs/spec/download',
    },
    {
      title: 'Axure Library',
      content: 'Beautifully visual Axure library',
      img: 'https://gw.alipayobjects.com/zos/rmsportal/dgjVqwkJvptQEtlfctvk.svg',
      link: 'http://library.ant.design/',
    },
    {
      title: 'Kitchen',
      content: 'A Sketch tools for designers',
      img: 'https://gw.alipayobjects.com/zos/rmsportal/vUxYuDdsbBBcMDxSGmwc.svg',
      link: 'http://kitchen.alipay.com/',
      hot: true,
    },
  ]
}
