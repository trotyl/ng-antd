import { Component, HostBinding } from '@angular/core'

@Component({
  selector: 'site-home-page2',
  templateUrl: './page-2.component.html',
  styleUrls: ['./page-2.component.scss'],
})
export class SiteHomePage2 {
  @HostBinding('class.home-page-wrapper') homePageWrapper = true
  @HostBinding('class.page2') page2 = true
  @HostBinding('id') id = 'page2'

  pageData = [
    {
      img: 'https://gw.alipayobjects.com/zos/rmsportal/eYNnmGagLWdrkdMHVUuA.svg',
      name: 'Ant Design Components',
    },
    {
      img: 'https://gw.alipayobjects.com/zos/rmsportal/EPaPtDVGnJhyqyBAUZMl.svg',
      name: 'Ant Design Pro',
      slogan: 'Out-of-the-box front-end / Design solution',
      link: 'https://pro.ant.design/index-cn',
    },
    {
      img: 'https://gw.alipayobjects.com/zos/rmsportal/GobRAKexhfTSJdLFzDFY.svg',
      name: 'Ant Design Mobile',
      slogan: `antd-mobile is the implementation of Ant Design's mobile specification`,
    },
    {
      img: 'https://gw.alipayobjects.com/zos/rmsportal/slVtnOCcgeAcLEPwtewY.svg',
      name: 'AntV',
      slogan: 'Simple, professional, with unlimited possibilities for data visualization solutions',
      link: 'https://antv.alipay.com/zh-cn/index.html',
    },
    {
      img: 'https://gw.alipayobjects.com/zos/rmsportal/EAHlyTmYeDtTkZIPbUnP.svg',
      name: 'Ant Design Landing',
      slogan: 'Landing Pages templates and specifications based of Ant Design language',
      link: 'https://landing.ant.design',
      new: true,
    },
  ]
}
