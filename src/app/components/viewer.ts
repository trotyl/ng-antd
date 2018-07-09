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
        return {
          type,
          path: factory.selector.split(/\-(.+)/)[1],
          title: this.titlecase.transform(factory.selector.replace(`${name}-demo-`, '').replace('-', ' ')),
        }
      })
      this.info = api[name]
    })
  }
}
