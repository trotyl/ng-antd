import * as fs from 'fs'
import * as path from 'path'
import { ClassReflection, Decorator, ReflectionKind } from '../typedoc/models/reflections'
import { Type } from '../typedoc/models/types'
import * as reflection from '../typedoc/reflection'
import { PackageInfo, PropertiesInfo, PropertyInfo } from './definition'

const result: { [pkg: string]: PackageInfo } = {}

for (const file of reflection.children) {
  if (!file.children) { continue }

  const packagePath = file.name.replace(/"/g, '')
  const [pkgName] = packagePath.split('/')

  if (!result[pkgName]) {
    result[pkgName] = {
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
      properties.push({
        name: property.name,
        description: property.comment && property.comment.shortText,
        type: stringifyType(property.type),
        defaultValue: property.defaultValue ? property.defaultValue.trim() : undefined,
      })
      if (!property.decorators) { continue }
      if (property.decorators.some(deco => deco.name === 'Input')) {
        const input = property.decorators.find(deco => deco.name === 'Input')!
        const attrName = input.arguments.bindingPropertyName ? input.arguments.bindingPropertyName.replace(/'/g, '') : null
        inputs[property.name] = attrName
      }
      if (property.decorators.some(deco => deco.name === 'Output')) {
        const output = property.decorators.find(deco => deco.name === 'Output')!
        const attrName = output.arguments.bindingPropertyName ? output.arguments.bindingPropertyName.replace(/'/g, '') : null
        outputs[property.name] = attrName
      }
    }
  }
  return { properties, inputs, outputs }
}

function stringifyType(type: Type): string {
  switch (type.type) {
    case 'intrinsic':
      return type.name
    case 'stringLiteral':
      return `"${type.value}"`
    case 'union':
      return type.types.map(stringifyType).join(' | ')
    case 'array':
      return `Array<${stringifyType(type.elementType)}>`
    case 'reference':
      if (type.typeArguments) {
        return `${type.name}<${type.typeArguments.map(stringifyType).join(',')}>`
      }
      return type.name
    default:
      return `TODO(type): ${type.type}`
  }
}

const outputPath = path.join(__dirname, './result.js')
const content = `export const api = ${JSON.stringify(result, undefined, 2)}`
fs.writeFileSync(outputPath, content, 'utf-8')
