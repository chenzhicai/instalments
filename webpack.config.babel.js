var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
	//插件项
    plugins: [commonsPlugin],
	//页面入口文件配置
    entry: {
        apply : './jsDevelop/lfq/apply1.js',
        applyNextStep: './jsDevelop/lfq/applyNextStep1.js',
        instalmentsSearch: './jsDevelop/lfq/instalmentsSearch.js',
        qrcodePay: './jsDevelop/lfq/qrcodePay.js',
        orderDetails: './jsDevelop/lfq/orderDetails.js'
    },
	//入口文件输出配置
    output: {
        path: './js/lfq',
        filename: '[name].min.js'
    },
	module: {
        //加载器配置
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.js 文件使用 jsx-loader 来编译处理
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
//            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    }
}