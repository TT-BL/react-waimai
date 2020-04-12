const { override, addLessLoader,fixBabelImports,addDecoratorsLegacy } = require('customize-cra') 
const theme=require('./theme')
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addDecoratorsLegacy(),
    addLessLoader({
        javascriptEnabled: true,
        modifyvars:theme,

    }),
)