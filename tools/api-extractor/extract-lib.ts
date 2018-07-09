import * as fs from 'fs'
import * as MarkdownIt from 'markdown-it'
import * as path from 'path'
import { ClassReflection, Decorator, ReflectionKind } from '../typedoc/models/reflections'
import * as reflection from '../typedoc/reflection'
import { PackageInfo, PropertiesInfo, PropertyInfo } from './definition'
import { stringifyType, stripQuote } from './util'

const md = new MarkdownIt({ html: true })

const result: { [pkg: string]: PackageInfo } = {}

for (const file of reflection.children) {
  if (!file.children) { continue }

  const packagePath = stripQuote(file.name)

  if (!packagePath.startsWith('src/lib/')) { continue }

  const [pkgName] = packagePath.replace('src/lib/', '').split('/')

  if (!result[pkgName]) {
    result[pkgName] = {
      intro: null,
      whenToUse: null,
      directives: [],
    }
  }

  const pkg = result[pkgName]

  for (const exportable of file.children) {
    if (exportable.kind === ReflectionKind.Class && exportable.decorators) {
      const decorators = exportable.decorators

      if (decorators.some(deco => deco.name === 'Directive' || deco.name === 'Component')) {
        const name = exportable.name
        const decorator = exportable.decorators.find(deco => deco.name === 'Directive' || deco.name === 'Component')
        if (!decorator) { throw new Error(`Internal error: missing valid decorator`)}
        const meta = extractDecoratorMetadata(decorator)
        const { properties, inputs, outputs } = extractProperties(exportable)
        pkg.directives.push({
          name,
          meta,
          properties,
          inputs,
          outputs,
        })
      }

      if (decorators.some(deco => deco.name === 'NgModule')) {
        if (exportable.comment) {
          const comment = exportable.comment
          if (comment.shortText) {
            let intro = md.render(comment.shortText)
            if (comment.text) {
              intro += md.render(comment.text)
            }
            pkg.intro = intro
          }
          if (comment.tags) {
            const whenToUse = comment.tags.find(tag => tag.tag.toLowerCase() === 'whenToUse'.toLowerCase())
            if (whenToUse) {
              pkg.whenToUse = md.render(whenToUse.text)
            }
          }
        }
      }
    }
  }

}

function extractDecoratorMetadata(decorator: Decorator): string {
  return decorator.arguments.obj
}

function extractProperties(declaration: ClassReflection): PropertiesInfo {
  if (!declaration.children) { return { inputs: {}, outputs: {}, properties: [] } }
  const inputs: { [prop: string]: string | null } = {}
  const outputs: { [prop: string]: string | null } = {}
  const properties: PropertyInfo[] = []
  for (const property of declaration.children) {
    if (property.kind === ReflectionKind.Property) {
      if (property.name.endsWith('$')) { continue }
      if (property.flags.isPrivate) { continue }
      if (property.comment && property.comment.tags && property.comment.tags.some(tag => tag.tag === 'internal')) { continue }
      const description = property.comment && property.comment.shortText
      properties.push({
        name: property.name,
        description: description ? md.renderInline(description) : undefined,
        type: stringifyType(property.type),
        defaultValue: property.defaultValue ? property.defaultValue.trim() : undefined,
      })
      if (!property.decorators) { continue }
      if (property.decorators.some(deco => deco.name === 'Input')) {
        const input = property.decorators.find(deco => deco.name === 'Input')!
        const attrName = input.arguments.bindingPropertyName ? stripQuote(input.arguments.bindingPropertyName) : null
        inputs[property.name] = attrName
      }
      if (property.decorators.some(deco => deco.name === 'Output')) {
        const output = property.decorators.find(deco => deco.name === 'Output')!
        const attrName = output.arguments.bindingPropertyName ? stripQuote(output.arguments.bindingPropertyName) : null
        outputs[property.name] = attrName
      }
    }
  }
  return { properties, inputs, outputs }
}

const outputPath = path.join(__dirname, './lib.js')
const content = `export const packages = ${JSON.stringify(result, undefined, 2)}`
fs.writeFileSync(outputPath, content, 'utf-8')
