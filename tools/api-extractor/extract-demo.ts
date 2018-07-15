import * as fs from 'fs'
import * as glob from 'glob'
import * as MarkdownIt from 'markdown-it'
import * as path from 'path'
import * as Prism from 'prismjs'
import { ClassReflection, ReflectionKind } from '../typedoc/models/reflections'
import * as reflection from '../typedoc/reflection'
import { PackageDemo } from './definition'
import { normalizeToken, stripQuote } from './util'

const md = new MarkdownIt({ html: true })
const root = path.join(__dirname, '../../src/app/components')

const result: { [pkg: string]: PackageDemo } = {}

for (const file of reflection.children) {
  if (!file.children) { continue }

  const packagePath = stripQuote(file.name)

  if (!packagePath.startsWith('src/app/components/')) { continue }

  const [pkgName, name] = packagePath.replace('src/app/components/', '').split('/')

  if (!result[pkgName]) {
    result[pkgName] = {
      demos: [],
    }
  }

  const pkg = result[pkgName]

  for (const exportable of file.children) {
    if (exportable.kind === ReflectionKind.Class && exportable.decorators && exportable.decorators.some(deco => deco.name === 'Component')) {

      let order = 0
      let title = null
      if (exportable.comment && exportable.comment.tags) {
        const tags = exportable.comment.tags
        const orderTag = tags.find(item => item.tag === 'order')
        if (orderTag) {
          order = Number.parseInt(orderTag.text.trim())
        }
        const titleTag = tags.find(item => item.tag === 'title')
        if (titleTag) {
          title = titleTag.text.trim()
        }
      }

      let description = ''
      if (exportable.comment && exportable.comment.shortText) {
        description = md.render(exportable.comment.shortText)
        if (exportable.comment.text) {
          description += md.render(exportable.comment.text)
        }
      }

      let clazz: CodeBlock | null = null
      if (exportable.children) {
        const clazzPath = fs.readFileSync(file.originalName, 'utf-8')
        const body = clazzPath.split(/export\sclass\s.*?\s(?=\{)/)[1]
        const clazzString = `class DemoComponent ${body}`
        clazz = { tokens: Prism.tokenize(clazzString, Prism.languages.javascript).map(normalizeToken) }
      }

      const templateUrl = file.originalName.replace('.ts', '.html')
      const templateString = fs.readFileSync(templateUrl, 'utf-8').trim()

      const template: CodeBlock = {
        tokens: Prism.tokenize(templateString, Prism.languages.html).map(normalizeToken),
      }

      pkg.demos.push({
        name,
        description,
        order,
        title,
        clazz,
        template,
      })
    }
  }
}

const outputPath = path.join(__dirname, './demo.js')
const content = `export const examples = ${JSON.stringify(result, undefined, 2)}`
fs.writeFileSync(outputPath, content, 'utf-8')
