import { TitleCasePipe } from '@angular/common'
import { Component, ComponentFactoryResolver, OnInit, Type } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PackageInfo } from '../../../tools/api/definition'
import { api } from '../../../tools/api/result'
import { group } from './demo.module'

@Component({
  templateUrl: './viewer.html',
  providers: [ TitleCasePipe ],
})
export class DocsViewer implements OnInit {
  name: string
  components: Array<{ type: Type<any>, path: string, title: string }> = []
  info: PackageInfo

  constructor(
    private cfr: ComponentFactoryResolver,
    private titlecase: TitleCasePipe,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const name = params.get('name')!
      this.name = name
      const componentTypes = group[name]
      this.components = componentTypes.map((type) => {
        const factory = this.cfr.resolveComponentFactory(type)
        const path = factory.selector.split(/\-(.+)/)[1]
        const demo = factory.selector.replace(`${name}-demo-`, '').replace('-', ' ')
        const title = this.titlecase.transform(demo)
        return { type, path, title }
      })
      this.info = api[name]
    })
  }
}
