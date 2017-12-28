const fs = require('fs-extra')
const path = require('path')
const { rollup } = require('rollup')
const uglify = require('rollup-plugin-uglify')
const shell = require('shelljs')
const glob = require('glob').sync
const { main: ngc } = require('./tools/ngc')
const rollupConfig = require('./rollup.config')

const WORKSPACE = 'tmp'

async function main() {
  fs.removeSync(abs(`./${WORKSPACE}`))
  fs.removeSync(abs('./publish'))

  fs.mkdirpSync(abs(`./${WORKSPACE}/lib`))
  fs.copySync(abs('./src/lib'), abs(`./${WORKSPACE}/lib`))
  inlineResourcesForDirectory(abs(`./${WORKSPACE}/lib`))

  fs.mkdirpSync(abs(`./${WORKSPACE}/dist`))

  for (const pkg of ['button', 'core', 'grid', 'icon', 'layout']) {
    const src = abs(`./${WORKSPACE}/lib/${pkg}`)
    const prj = abs(`./${WORKSPACE}/lib/${pkg}/tsconfig-build.json`)
    const ngcDist2015 = abs(`./${WORKSPACE}/es2015/${pkg}`)
    const ngcDist5 = abs(`./${WORKSPACE}/es5/${pkg}`)

    ngc(['-p', prj, '--target', 'es2015', '--outDir', ngcDist2015])
    ngc(['-p', prj, '--target', 'es5', '--outDir', ngcDist5])

    const esm2015Options = { 
      ...rollupConfig,
      input: abs(`./${WORKSPACE}/es2015/${pkg}/index.js`),
      external: [ ...rollupConfig.external, 'tslib' ],
      output: {
        ...rollupConfig.output,
        file: abs(`./${WORKSPACE}/dist/esm2015/${pkg}.js`),
        format: 'es',
      }
    }
    
    await rollupWithOptions(esm2015Options)

    const esm5Options = { 
      ...rollupConfig,
      input: abs(`./${WORKSPACE}/es5/${pkg}/index.js`),
      external: [ ...rollupConfig.external, 'tslib' ],
      output: {
        ...rollupConfig.output,
        file: abs(`./${WORKSPACE}/dist/esm5/${pkg}.js`),
        format: 'es',
      }
    }

    await rollupWithOptions(esm5Options)

    const umd5Options = { 
      ...rollupConfig,
      input: abs(`./${WORKSPACE}/es5/${pkg}/index.js`),
      output: {
        ...rollupConfig.output,
        file: abs(`./${WORKSPACE}/dist/bundles/ng-antd-${pkg}.umd.js`),
        format: 'umd',
      }
    }

    await rollupWithOptions(umd5Options)

    const mumd5Options = { 
      ...rollupConfig,
      input: abs(`./${WORKSPACE}/es5/${pkg}/index.js`),
      plugins: [...rollupConfig.plugins, uglify() ],
      output: {
        ...rollupConfig.output,
        file: abs(`./${WORKSPACE}/dist/bundles/ng-antd-${pkg}.umd.min.js`),
        format: 'umd',
      }
    }

    await rollupWithOptions(mumd5Options)

    glob(abs(`./${WORKSPACE}/es2015/**/*.{js,map}`))
      .forEach(filePath => fs.removeSync(filePath))

    fs.copySync(abs(`./${WORKSPACE}/es2015`), abs(`./${WORKSPACE}/dist`))

    const packageJson = {
      name: `ng-antd/${pkg}`,
      typings: './index.d.ts',
      main: `../bundles/ng-antd-${pkg}.umd.js`,
      module: `../esm5/${pkg}.js`,
      es2015: `../esm2015/${pkg}.js`,
    }
    
    fs.writeJsonSync(abs(`./${WORKSPACE}/dist/${pkg}/package.json`), packageJson, { encoding: 'utf-8', spaces: 2 })
  }

  fs.moveSync(abs(`./${WORKSPACE}/dist`), abs(`./publish`))
  fs.removeSync(abs(`./${WORKSPACE}`))
  fs.copyFileSync(abs(`./src/lib/package.json`), abs(`./publish/package.json`))
}

main()

function abs(filename) {
  return path.join(__dirname, filename) 
}

function inlineResourcesForDirectory(folderPath) {
  glob(path.join(folderPath, '**/*.ts')).forEach(filePath => inlineResources(filePath))
}

function inlineResources(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf-8')

  fileContent = inlineTemplate(fileContent, filePath)
  fileContent = inlineStyles(fileContent, filePath)

  fs.writeFileSync(filePath, fileContent, 'utf-8')
}

function inlineTemplate(fileContent, filePath) {
  return fileContent.replace(/templateUrl:\s*'([^']+?\.html)'/g, (_match, templateUrl) => {
    const templatePath = path.join(path.dirname(filePath), templateUrl)
    const templateContent = loadResourceFile(templatePath)
    return `template: \`${templateContent}\``
  })
}

function inlineStyles(fileContent, filePath) {
  return fileContent.replace(/styleUrls:\s*(\[[\s\S]*?])/gm, (_match, styleUrlsValue) => {
    const styleUrls = eval(styleUrlsValue)

    const styleContents = styleUrls
      .map(url => join(path.dirname(filePath), url))
      .map(path => loadResourceFile(path));

    return `styles: [\`${styleContents.join(' ')}\`]`
  })
}

function loadResourceFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8')
    .replace(/([\n\r]\s*)+/gm, ' ')
}

async function rollupWithOptions(options) {
  const {
    output: outputOptions,
    ...inputOptions
  } = options

  const bundle = await rollup(inputOptions)
  await bundle.write(outputOptions)
}
