export interface PropertyInfo {
  name: string
  type: string
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
  directives: DirectiveInfo[]
}
