import { TitleCasePipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit, Type } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { PackageInfo } from '../../../tools/api-extractor/definition'
import { examples } from '../../../tools/api-extractor/demo'
import { packages } from '../../../tools/api-extractor/lib'
import { group } from './demo.module'

export interface DemoComponent {
  type: Type<any>
  description: string
  order: number
  path: string
  title: string
  template: CodeBlock
  clazz: CodeBlock | null
}

@Component({
  templateUrl: './container.html',
  providers: [ TitleCasePipe ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsContainer implements OnInit {
  name: string
  components: DemoComponent[] = []
  info: PackageInfo

  constructor(
    private cfr: ComponentFactoryResolver,
    private titlecase: TitleCasePipe,
    private route: ActivatedRoute,
    private title: Title,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const name = params.get('name')!
      this.switchComponent(name)
    })
  }

  switchComponent(name: string): void {
    this.name = name

    this.title.setTitle(`${this.titlecase.transform(name)} - Ant Design`)

    const componentTypes = group[name]
    const demos = examples[name].demos

    this.components = componentTypes.map((type) => {
      const factory = this.cfr.resolveComponentFactory(type)
      const path = factory.selector.replace(`${name}-demo-`, '')

      const demo = demos.find(item => item.name === factory.selector)!
      const { order, title: rawTitle, description, template, clazz } = demo
      let title = rawTitle
      if (!title) {
        const demoName = path.replace('-', ' ')
        title = this.titlecase.transform(demoName)
      }

      return { type, path, order, title, description, template, clazz }
    }).sort((prev, next) => prev.order - next.order)

    this.info = packages[name]
  }
}
