/// <reference path="../../src/typings.d.ts" />

export interface PropertyInfo {
  name: string
  type: CodeBlock
  defaultValue?: string
  description?: string
}

export interface PropertiesInfo {
  inputs: { [prop: string]: string | null }
  outputs: { [prop: string]: string | null }
  properties: PropertyInfo[]
}

export interface DirectiveInfo extends PropertiesInfo {
  name: string
  meta: string
}

export interface PackageInfo {
  intro: string | null
  whenToUse: string | null
  directives: DirectiveInfo[]
}

export interface DemoItem {
  name: string
  order: number
  title: string | null
  description: string
  template: CodeBlock
  clazz: CodeBlock | null
}

export interface PackageDemo {
  demos: DemoItem[]
}
