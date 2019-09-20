import { Component, HostBinding } from '@angular/core'

@Component({
  selector: 'site-home-page1',
  templateUrl: './page-1.component.html',
  styleUrls: ['./page-1.component.scss'],
})
export class SiteHomePage1 {
  @HostBinding('class.home-page-wrapper') homePageWrapper = true
  @HostBinding('class.page1') page1 = true

  pageData = [
    {
      img: 'https://gw.alipayobjects.com/zos/rmsportal/URIeCOKLMAbRXaeXoNqN.svg',
      name: '设计价值观',
      nameEn: 'Design Values',
      to: '/docs/spec/values',
    },
    {
      img: 'https://gw.alipayobjects.com/zos/rmsportal/qXncdwwUTTgUFnsbCNCE.svg',
      name: '视觉',
      nameEn: 'Visual',
      to: '/docs/spec/colors',
    },
    {
      img: 'https://gw.alipayobjects.com/zos/rmsportal/YFXXZocxAgjReehpPNbX.svg',
      name: '可视化',
      nameEn: 'Visualization',
      to: '/docs/spec/visual',
    },
    {
      img: 'https://gw.alipayobjects.com/zos/rmsportal/VPuetGsvJuYBwoDkZWFW.svg',
      name: '动效',
      nameEn: 'Animation',
      to: '/docs/spec/motion',
    },
  ]
}
