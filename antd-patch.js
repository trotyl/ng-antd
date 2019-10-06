const { resolve } = require('path')
const { sed } = require('shelljs')

const node_modules = resolve(__dirname, 'node_modules')

sed('-i', 'rc-footer/assets/index.css', 'rc-footer/assets/index.less', resolve(node_modules, 'antd/site/theme/static/footer.less'))
