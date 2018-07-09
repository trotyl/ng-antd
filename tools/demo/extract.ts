import * as fs from 'fs'
import * as glob from 'glob'
import * as path from 'path'

const root = path.join(__dirname, '../../src/app/components')

const result: { [file: string]: string } = {}

const components = glob.sync(`${root}/**/*-demo-*.ts`)
const templates = glob.sync(`${root}/**/*-demo-*.html`)

for (const file of components) {
  const raw = fs.readFileSync(file, 'utf-8')
  const body = raw.split(/export\sclass\s.*?\s(?=\{)/)[1]
  const literal = `class DemoComponent ${body}`
  result[`${path.parse(file).name}.ts`] = literal.trim()
}

for (const file of templates) {
  const raw = fs.readFileSync(file, 'utf-8')
  result[`${path.parse(file).name}.html`] = raw.trim()
}

const outputPath = path.join(__dirname, './result.js')
const content = `export const demos = ${JSON.stringify(result, undefined, 2)}`
fs.writeFileSync(outputPath, content, 'utf-8')
