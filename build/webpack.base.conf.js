var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var projectRoot = path.resolve(__dirname, '../')
var env = process.env.NODE_ENV
    // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
    // various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

//webpck插件
var plugins = [
    // 使用 ProvidePlugin 加载使用率高的依赖库
     new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     jQuery: 'jquery',
    //     "window.$": 'jquery',
         _: 'lodash'
     })
];

module.exports = {
    entry: {
        app: ['babel-polyfill', './src/app/app.js'] //'./src/app/app.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'pages': path.resolve(__dirname, '../src/pages'),
            'commonMethods': path.resolve(__dirname, '../src/methods/common'),
            'commonHelpers': path.resolve(__dirname, '../src/methods/helpers'),
            'bUtils': path.resolve(__dirname, '../src/methods/helpers/utils'),
            'ajaxAPI': path.resolve(__dirname, '../src/api'),
            'configs': path.resolve(__dirname, '../src/configs/api.js'),

            httpHelper: path.join(__dirname, '../src/methods/helpers/http'),
            rgbahex: path.join(__dirname, '../src/methods/helpers/RGBATOHEX.js'),
            commonEventInit: path.join(__dirname, '../src/methods/common/commonEventInit'),
            colorpickerInit: path.join(__dirname, 'src/methods/common/colorpickerInit.js'), //取色器初始化
            cssJson: path.join(__dirname, '../src/assets/vendor/CSSJSON/cssjson'),
            colorbox: path.join(__dirname, '../src/assets/vendor/colorbox/jquery.colorbox.js'),
            jquery: path.join(__dirname, '../src/assets/vendor/jquery/jquery'), //jquery
            superSlide: path.join(__dirname, '../src/assets/vendor/jquery/SuperSlide'),
            zoomPoster: path.join(__dirname, '../src/assets/vendor/jquery/ZoomPic'),
            rulersGuides: path.join(__dirname, '../src/assets/vendor/RulersGuides'), //标尺
            rulerInit: path.join(__dirname, '../src/methods/common/rulerInit.js'),
            colorpicker: path.join(__dirname, '../src/assets/vendor/evol-colorpicker/evol-colorpicker'), //颜色拾取插件
            smartMenu: path.join(__dirname, '../src/assets/vendor/jquery/jquery.smartmenus'), //右键
            hotKeys: path.join(__dirname, '../src/assets/vendor/jquery/jquery.hotkeys'), //键盘组合事件
            jscroll: path.join(__dirname, '../src/assets/vendor/jscroll/jscroll'), //jscroll
            fsSlider: path.join(__dirname, '../src/assets/vendor/fsSlider/fsSlider'), //fsSlider
            nestable: path.join(__dirname, '../src/assets/vendor/nestable/jquery.nestable'), //nestable
            setLevel:path.join(__dirname, '../src/methods/common/setLevel'),
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "file-loader?name=images/[name].[ext]"
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    vue: {
        loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
        postcss: [
            require('autoprefixer')({
                browsers: ['last 2 versions']
            })
        ]
    },
    plugins: plugins
}