var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');

var bannerPlugin = new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
})

function getBaseConfig() {
    return {
        entry: {
            'index': path.resolve('src', 'entry.js')
        },
        output: {
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules(?!(\/|\\).*(weex).*)/
            }, {
                test: /\.vue(\?[^?]+)?$/
            }]
        },
        plugins: [
            // new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }}),
            bannerPlugin,

            new CopyWebpackPlugin([{
                    from: 'src/imgs',
                    to: 'imgs'
                },
                // {
                //     from: 'src/htmls',
                //     to: 'htmls'
                // },
                {
                    from: 'src/json',
                    to: 'json'
                }
            ], {})
        ],
        //配置webpack开发服务功能
        devServer: {
            contentBase: path.resolve(__dirname, './'),
            compress: true,
            host: "0.0.0.0",
            port: "1337",
            // open:true
            proxy: {
                '/pweb': {
                    target: 'http:/192.168.1.252:9088/portal/', // 接口的域名
                    // secure: false, // 如果是https接口，需要配置这个参数
                    changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                    // pathRewrite: {
                    // '^/mpweb': ''
                    // }
                },
                '/mpweb': {
                    target: 'http://10.18.192.16:8080/', // 接口的域名
                    // secure: false, // 如果是https接口，需要配置这个参数
                    changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                    // pathRewrite: {
                    // '^/mpweb': ''
                    // }
                }
            }
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
              'vue$': 'vue/dist/vue.esm.js',
              '@': path.resolve(__dirname,'src'),
            }
          },
        
    }
}

var webConfig = getBaseConfig()
webConfig.output.filename = '[name].web.js'
webConfig.module.rules[1].loader = 'vue-loader'
/**
 * important! should use postTransformNode to add $processStyle for
 * inline style normalization.
 */
webConfig.module.rules[1].options = {
    optimizeSSR: false,
    postcss: [
        // to convert weex exclusive styles.
        require('postcss-plugin-weex')(),
        require('autoprefixer')({
            browsers: ['> 0.1%', 'ios >= 8', 'not ie < 12']
        }),
        require('postcss-plugin-px2rem')({
            // base on 750px standard.
            rootValue: 75,
            // to leave 1px alone.
            minPixelValue: 1.01
        })
    ],
    compilerModules: [{
        postTransformNode: el => {
            // to convert vnode for weex components.
            require('weex-vue-precompiler')()(el)
        }
    }]
}

var nativeConfig = getBaseConfig()
nativeConfig.output.filename = '[name].weex.js'
nativeConfig.module.rules[1].loader = 'weex-loader'

module.exports = [webConfig, nativeConfig]