const resolve = require('rollup-plugin-node-resolve')
const sourcemaps = require('rollup-plugin-sourcemaps')

const globals = {
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/cdk/layout': 'ng.cdk.layout',
  'rxjs/Subject': 'Rx',
  'rxjs/observable/combineLatest': 'Rx.Observable',
  'rxjs/operators': 'Rx.Observable.prototype',
  'rxjs/operators/distinctUntilChanged': 'Rx.Observable.prototype',
  'rxjs/operators/map': 'Rx.Observable.prototype',
  'rxjs/operators/startWith': 'Rx.Observable.prototype',
  'ng-antd/core': 'ng.antd.core',
  'ng-antd/icon': 'ng.antd.icon',
}

const plugins = [
  resolve(),
  sourcemaps(),
]

module.exports = {
  plugins,
  external: Object.keys(globals),
  output: {
    exports: 'named',
    name: 'ng.antd',
    globals,
    sourcemap: true,
  }
}
